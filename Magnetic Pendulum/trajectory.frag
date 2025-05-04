#version 300 es
precision highp float;

in vec2 uv;
out vec4 fragColor;

uniform vec2 resolution;

const float friction = 0.2;
const float dt = 0.055;
const int maxSteps = 500;
const float scale = 1.0;
const vec2 translation = vec2(0.0, 0.0);

vec2 pos0[3] = vec2[3](
    vec2(0.9, 0.96),
    vec2(0.9, 0.95),
    vec2(0.9, 0.955)
);

vec2 attractors[4] = vec2[4](
    vec2(-0.5, -0.5),
    vec2(-0.5, 0.5),
    vec2(0.5, -0.5),
    vec2(0.5, 0.5)
);

float polarity[4] = float[4](
    -1.0, 1.0, 1.0, 1.0
);

vec3 attractorColors[4] = vec3[4](
    vec3(1.0, 0.0, 0.0),
    vec3(0.0, 0.0, 1.0),
    vec3(0.0, 1.0, 0.0),
    vec3(0.0, 1.0, 1.0)
);

vec2 magneticForce(vec2 pos, vec2 attractor) {
    vec2 dir = attractor - pos;
    float r2 = dot(dir, dir);

    return dir / pow((r2 + 0.25), 5.0/2.0);
}

float drawDot(vec2 uv, vec2 center, float radius) {
    float d = distance(uv, center);
    return smoothstep(radius, radius * 0.8, d);
}

float sdSegment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

void main() {
    // uv.xy = uv.xy / resolution.xy;
    vec3 color = vec3(0.8);

    for(int k = 0; k < 3; k++) {

        vec2 pos = pos0[k];
        vec2 vel = vec2(0.0);

        vec2 prev_force = vec2(0.0);
        vec2 force = vec2(0.0);
        vec2 new_force = vec2(0.0);

        vec2 prev = pos;

        for (int i = 0; i < 4; ++i) {
            float m = drawDot(uv, attractors[i], 0.02);
            color -= vec3(0.5) * m * polarity[i];
        }

        for(int i = 0; i < maxSteps; i++) {
            
            prev_force = force;
            force = new_force;
            new_force = -1.0 * friction * vel - pos;
            for(int j = 0; j < 4; j++) {
                new_force += polarity[j] * magneticForce(pos, attractors[j]);
            }

            vel += (1.0/12.0) * (5.0 * new_force + 8.0 * force - prev_force) * dt;
            pos += vel*dt + (1.0/6.0) * (4.0 * force - prev_force) * pow(dt, 2.0);

            // float b = drawDot(uv, pos, 0.004);
            // color -= vec3(b);

            float d = sdSegment(uv, prev, pos);
            float line = smoothstep(0.002, 0.0, d);
            color -= line * attractorColors[k];

            // float timeNorm = (float(i) / float(maxSteps)) * 2.0 - 1.0;
            // float xNorm = pos.y + 1.0;

            // vec2 plotPos = vec2(timeNorm, 1.0 - xNorm);
            // float line = drawDot(uv, plotPos, 0.005);
            // color -= line * attractorColors[k];

            prev = pos;
        }
    }

    

    // for(int i = 0; i < 4; i++) {
    //     if (distance(pos, attractors[i]) < 0.2) {
    //         fragColor = vec4(attractorColors[i] * distance(pos, attractors[i]) * 10.0, 1.0);
    //         fragColor += vec4(color, 1.0);
    //         return;
    //     }
    // }
  
    fragColor += vec4(color, 1.0);

    // fragColor = vec4(pos.x, pos.y, 0.0, 1.0); // visualize UV coordinates
}