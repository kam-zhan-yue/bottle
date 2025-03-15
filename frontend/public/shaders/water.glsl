#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform vec2 resolution;

float voronoi(vec2 uv) {
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float minDist1 = 1.0;
    float minDist2 = 1.0;
    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = vec2(fract(sin(dot(i + neighbor, vec2(127.1, 311.7))) * 43758.5453));
            vec2 diff = neighbor + point - f;
            float dist = length(diff);

            float step1 = 1.0 - step(minDist1, dist);
            float step2 = 1.0 - step(minDist2, dist);

            minDist2 = minDist1 * step1 + (1.0 - step1) * (step2 * dist) + ((1.0 - step1) * (1.0 - step2)) * minDist2;
            minDist1 = dist * step1 + (1.0 - step1) * minDist1;
        }
    }
    return minDist2 - minDist1;
}

float round(float x) {
    return floor(x + 0.5);
}

vec2 roundVec2(vec2 v) {
    return vec2(round(v.x), round(v.y));
}

void main() {
    vec2 uv = (8.0 * roundVec2(gl_FragCoord.xy / 8.0) + vec2(256.0, 256.0)) / resolution.xy;

    // More vibrant than the original!
    vec3 mainBlue = vec3(0.0, 0.7, 1.0);
    vec3 lightBlue = vec3(0.3, 0.85, 1.0);
    vec3 foamColor = vec3(0.9, 1.0, 1.0);

    // I decided to use the second color, to fade the foam a bit more, which is why they'll share the same UV :)
    float scale1 = 10.0;
    float distortion1Strength = 0.12;
    float distortion1Frequency = 6.0;
    float distortion1Speed = 1.6;
    float edge1ThresholdMin = 0.02;
    float edge1ThresholdMax = 0.18;
    float edge2ThresholdMin = 0.24;
    float edge2ThresholdMax = 0.48;

    vec2 uv1 = uv * scale1;

    vec2 distortedUV1 = uv1 + vec2(
                sin(time * distortion1Speed + uv1.y * distortion1Frequency) * distortion1Strength,
                cos(time * distortion1Speed + uv1.x * distortion1Frequency) * distortion1Strength
            );

    float edgeDist1 = voronoi(distortedUV1);

    float edges1 = smoothstep(edge1ThresholdMin, edge1ThresholdMax, edgeDist1);

    float edge1Halo = smoothstep(0.1, 0.5, edgeDist1); // Lighter effect around white lines

    float edges2 = smoothstep(edge2ThresholdMin, edge2ThresholdMax, edgeDist1);

    vec3 e = mix(lightBlue, mainBlue, step(0.5, edges2));
    e = mix(foamColor, e, step(0.5, edges1));

    e *= 0.1 + 1.0 - edge1Halo * 0.1;

    gl_FragColor = vec4(vec3(e), 1.0);
}
