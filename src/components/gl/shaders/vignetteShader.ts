export const VignetteShader = {
  uniforms: {
    tDiffuse: { value: null }, // provided by ShaderPass
    darkness: { value: 1.0 },  // strength of the vignette effect
    offset: { value: 1.0 },    // vignette offset
  },
  vertexShader: /* glsl */`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse;
    uniform float darkness;
    uniform float offset;
    varying vec2 vUv;

    void main() {
      vec4 texel = texture2D(tDiffuse, vUv);

      // Distance from center
      vec2 uv = (vUv - 0.5) * 2.0;
      float dist = dot(uv, uv);

      // Vignette factor (1.0 at center, 0.0 at edges)
      float vignette = 1.0 - smoothstep(offset, offset + darkness, dist);

      // Mix with white instead of dark
      vec3 color = mix(vec3(1.0), texel.rgb, vignette);

      gl_FragColor = vec4(color, texel.a);
    }
  `
};
