#version 300 es
#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTexCoord;
uniform sampler2D tex;
uniform vec2 normalRes;

vec2 attractors[3] = vec2[](
    vec2(0.5, 0.8),
    vec2(0.2, 0.2),
    vec2(0.8, 0.2)
)

vec3 attractorColors[3] = vec3[](
    vec3(1.0, 0.0, 0.0),
    vec3(0.0, 1.0, 0.0),
    vec3(0.0, 0.0, 1.0)
)

vec2 magneticForce(vec2 pos, vec2 attractor) {
    vec2 dir = attractor - pos;
    float r2 = dot(dir, dir) + 0.001;

    return dir / (r2 * sqrt(r2));
}

void main() {
    vec2 uv = vTexCoord.xy / normalRes.xy;
    // uv.y = 1.0 - uv.y;
  
    vec2 pos = uv;
    vec2 vel = vec2(0.0);
    float dt = 0.01;
    int maxSteps = 300;

    for(int i = 0; i < maxSteps; ++i) {
        vec2 force = vec2(0.0);
        for(int j = 0; j < 3; ++j) {
            force += magneticForce(pos, attractors[j]);
        }
    }

    vel += force * dt;
    vel *= 0.99;
    pos += vel*dt;

    for(int i = 0; i < 3; ++i) {
        if (distance(pos, attractors[i]) < 0.01) {
            gl_FragColor = vec4(attractorColors[i], 1.0);
            return;
        }
    }
  
    gl_FragColor = vec4(1.0);
}