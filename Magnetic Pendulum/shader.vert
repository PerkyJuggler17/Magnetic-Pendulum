#version 300 es

in vec3 aPosition;
in vec2 aTexCoord;
out vec2 uv;

void main() {
    uv = (aTexCoord * 2.0) - 1.0;

    vec4 positionVec4 = vec4(aPosition, 1.0);
    positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

    gl_Position = positionVec4;
}