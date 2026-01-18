import './style.css';
import * as THREE from 'three';

// ============== Color Themes ==============
interface ColorTheme {
  uColor1: [number, number, number];
  uColor2: [number, number, number];
  uColor3: [number, number, number];
  uColor4: [number, number, number];
}

const THEMES: Record<string, ColorTheme> = {
  // === 原有主题 ===
  'Warm Memory': {
    uColor1: [1, 0.604, 0.033],
    uColor2: [1, 0.058, 0.184],
    uColor3: [0.016, 0.723, 0.855],
    uColor4: [0.246, 0.058, 1]
  },
  'Deep Ocean': {
    uColor1: [0.058, 1, 0.644],
    uColor2: [0, 0.184, 1],
    uColor3: [0, 0.723, 1],
    uColor4: [0.091, 0, 0.604]
  },
  'Lush Forest': {
    uColor1: [0.604, 1, 0],
    uColor2: [0, 0.402, 0.091],
    uColor3: [0, 0.604, 0.402],
    uColor4: [1, 1, 0.246]
  },
  'Sunset Vibes': {
    uColor1: [1, 0.319, 0],
    uColor2: [1, 0, 0.033],
    uColor3: [0.033, 0, 0.133],
    uColor4: [0, 0.006, 0.033]
  },
  // === 新增主题 ===
  'Aurora Night': {
    uColor1: [0.4, 1, 0.6],      // 极光绿
    uColor2: [0.2, 0.1, 0.4],    // 深紫夜空
    uColor3: [0.9, 0.3, 0.9],    // 粉紫光
    uColor4: [0.1, 0.5, 0.8]     // 冰蓝
  },
  'Cherry Blossom': {
    uColor1: [1, 0.75, 0.8],     // 樱花粉
    uColor2: [0.95, 0.5, 0.6],   // 深粉
    uColor3: [1, 0.9, 0.95],     // 浅粉白
    uColor4: [0.85, 0.4, 0.5]    // 玫瑰红
  },
  'Cyber Neon': {
    uColor1: [0, 1, 1],          // 青色霓虹
    uColor2: [1, 0, 0.8],        // 洋红
    uColor3: [0.2, 0, 0.4],      // 深紫背景
    uColor4: [1, 1, 0]           // 黄色高光
  },
  'Golden Hour': {
    uColor1: [1, 0.85, 0.4],     // 金色
    uColor2: [1, 0.5, 0.2],      // 橙色
    uColor3: [0.95, 0.75, 0.5],  // 浅金
    uColor4: [0.8, 0.3, 0.1]     // 琥珀
  },
  'Midnight Galaxy': {
    uColor1: [0.6, 0.2, 0.8],    // 紫色星云
    uColor2: [0.1, 0.05, 0.2],   // 深空黑
    uColor3: [0.3, 0.5, 0.9],    // 星蓝
    uColor4: [0.9, 0.4, 0.6]     // 粉红星云
  },
  'Arctic Ice': {
    uColor1: [0.7, 0.9, 1],      // 冰蓝
    uColor2: [0.4, 0.6, 0.8],    // 深冰蓝
    uColor3: [0.95, 0.98, 1],    // 雪白
    uColor4: [0.5, 0.7, 0.85]    // 冰川蓝
  },
  'Tropical Paradise': {
    uColor1: [0, 0.9, 0.7],      // 热带绿
    uColor2: [1, 0.6, 0],        // 芒果橙
    uColor3: [0.2, 0.8, 0.9],    // 海水蓝
    uColor4: [1, 0.4, 0.5]       // 火烈鸟粉
  },
  'Lavender Dream': {
    uColor1: [0.8, 0.7, 1],      // 薰衣草紫
    uColor2: [0.6, 0.5, 0.8],    // 深紫
    uColor3: [0.95, 0.9, 1],     // 淡紫白
    uColor4: [0.7, 0.6, 0.9]     // 中紫
  },
  // === iPhone X 风格主题 ===
  'iPhone X Pink': {
    uColor1: [0.95, 0.2, 0.55],  // 洋红/粉红
    uColor2: [1, 0.4, 0.35],     // 橙红
    uColor3: [0.25, 0.4, 0.85],  // 深蓝
    uColor4: [0.95, 0.85, 0.9]   // 浅粉白
  },
  'iPhone X Yellow': {
    uColor1: [0.95, 0.75, 0.15], // 金黄
    uColor2: [0.95, 0.6, 0.3],   // 橙黄
    uColor3: [0.4, 0.85, 0.7],   // 青绿
    uColor4: [0.95, 0.95, 0.85]  // 奶白
  },
  'iPhone X Green': {
    uColor1: [0.3, 0.8, 0.55],   // 翠绿
    uColor2: [0.95, 0.5, 0.3],   // 橙色
    uColor3: [0.2, 0.45, 0.8],   // 深蓝
    uColor4: [0.95, 0.95, 0.95]  // 纯白
  },
  'iPhone X Ink': {
    uColor1: [0.95, 0.25, 0.35], // 红色
    uColor2: [0.85, 0.65, 0.2],  // 金色
    uColor3: [0.25, 0.75, 0.65], // 青绿
    uColor4: [0.35, 0.3, 0.75]   // 紫蓝
  },
  // === 特殊主题 ===
  'Black Gold': {
    uColor1: [0.85, 0.65, 0.15], // 金色
    uColor2: [0.05, 0.05, 0.08], // 深黑
    uColor3: [0.95, 0.75, 0.25], // 亮金
    uColor4: [0.12, 0.1, 0.15]   // 暗灰黑
  }
};

// 融合主题的三个配色（用于循环动画）
const FUSION_COLORS = [
  // Pink (图1): 粉红/洋红 + 深蓝 + 橙红 + 浅粉白
  {
    uColor1: [0.95, 0.2, 0.55],
    uColor2: [0.25, 0.4, 0.85],
    uColor3: [1, 0.4, 0.35],
    uColor4: [0.95, 0.85, 0.9]
  },
  // Yellow (图2): 金黄 + 青绿 + 橙黄 + 奶白
  {
    uColor1: [0.95, 0.75, 0.15],
    uColor2: [0.4, 0.85, 0.7],
    uColor3: [0.95, 0.6, 0.3],
    uColor4: [0.95, 0.95, 0.85]
  },
  // Green (图3): 翠绿 + 深蓝 + 橙色 + 纯白
  {
    uColor1: [0.3, 0.8, 0.55],
    uColor2: [0.2, 0.45, 0.8],
    uColor3: [0.95, 0.5, 0.3],
    uColor4: [0.95, 0.95, 0.95]
  }
];

// ============== Shader Code ==============
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uDistortion;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

varying vec2 vUv;

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 aspectUV = vec2(uv.x * aspect, uv.y);
  float time = uTime;

  float scale = 0.6;

  float n1 = snoise(aspectUV * scale + vec2(time * 0.3, time * 0.2));
  float n2 = snoise(aspectUV * scale - vec2(time * 0.2, time * 0.4));

  vec2 distort = vec2(n1, n2) * uDistortion;
  vec2 uvWarped = uv + distort;

  float mixX = smoothstep(0.0, 1.0, uvWarped.x);
  float mixY = smoothstep(0.0, 1.0, uvWarped.y);

  vec3 topColor = mix(uColor1, uColor3, smoothstep(0.3, 0.9, mixX));
  vec3 botColor = mix(uColor2, uColor4, mixX);
  vec3 finalColor = mix(botColor, topColor, mixY);

  finalColor += vec3(0.05);
  float centerGlow = 1.0 - distance(uv, vec2(0.5, 0.6));
  finalColor += uColor1 * centerGlow * 0.2;

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

// ============== App State ==============
interface AppState {
  flowSpeed: number;
  liquidStrength: number;
  currentTheme: string;
  targetColors: ColorTheme;
  currentColors: ColorTheme;
  uiVisible: boolean;
  isFusionMode: boolean;
  fusionPhase: number;
  isPaused: boolean;
}

const state: AppState = {
  flowSpeed: 0.1,
  liquidStrength: 0.35,
  currentTheme: 'Warm Memory',
  targetColors: { ...THEMES['Warm Memory'] },
  currentColors: { ...THEMES['Warm Memory'] },
  uiVisible: true,
  isFusionMode: false,
  fusionPhase: 0,
  isPaused: false
};

// ============== Three.js Setup ==============
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let material: THREE.ShaderMaterial;

function initThree(container: HTMLElement): void {
  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 1;

  renderer = new THREE.WebGLRenderer({
    antialias: false,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Create fullscreen plane
  const geometry = new THREE.PlaneGeometry(2, 2);

  material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uDistortion: { value: state.liquidStrength },
      uColor1: { value: new THREE.Color().fromArray(state.currentColors.uColor1) },
      uColor2: { value: new THREE.Color().fromArray(state.currentColors.uColor2) },
      uColor3: { value: new THREE.Color().fromArray(state.currentColors.uColor3) },
      uColor4: { value: new THREE.Color().fromArray(state.currentColors.uColor4) }
    }
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Handle resize
  window.addEventListener('resize', onResize);
}

function onResize(): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
  material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
}

// ============== Color Interpolation ==============
function lerpColor(current: [number, number, number], target: [number, number, number], t: number): [number, number, number] {
  return [
    current[0] + (target[0] - current[0]) * t,
    current[1] + (target[1] - current[1]) * t,
    current[2] + (target[2] - current[2]) * t
  ];
}

function updateColors(dt: number): void {
  const lerpFactor = 1 - Math.pow(0.05, dt); // Smooth transition

  state.currentColors.uColor1 = lerpColor(state.currentColors.uColor1, state.targetColors.uColor1, lerpFactor);
  state.currentColors.uColor2 = lerpColor(state.currentColors.uColor2, state.targetColors.uColor2, lerpFactor);
  state.currentColors.uColor3 = lerpColor(state.currentColors.uColor3, state.targetColors.uColor3, lerpFactor);
  state.currentColors.uColor4 = lerpColor(state.currentColors.uColor4, state.targetColors.uColor4, lerpFactor);

  material.uniforms.uColor1.value.fromArray(state.currentColors.uColor1);
  material.uniforms.uColor2.value.fromArray(state.currentColors.uColor2);
  material.uniforms.uColor3.value.fromArray(state.currentColors.uColor3);
  material.uniforms.uColor4.value.fromArray(state.currentColors.uColor4);
}

// ============== Animation Loop ==============
let lastTime = 0;
let accumulatedTime = 0; // 累加时间，不会因速度变化而跳变
let fusionTime = 0; // 独立的融合时间计数器

// 融合主题：在三个配色之间连续平滑循环
function updateFusionColors(dt: number): void {
  if (!state.isFusionMode || state.isPaused) return;

  // 融合时间独立累加
  fusionTime += dt * 0.15; // 控制整体速度

  // 使用正弦波实现连续平滑过渡
  // 每个颜色通道独立变化，形成自然的流动效果
  const t = fusionTime;

  // 使用不同频率的正弦波混合三个配色
  // 这样颜色变化是连续的，没有突变
  const phase1 = (Math.sin(t * 0.5) + 1) / 2;           // 0~1 慢速振荡
  const phase2 = (Math.sin(t * 0.5 + 2.094) + 1) / 2;   // 相位差 120°
  const phase3 = (Math.sin(t * 0.5 + 4.189) + 1) / 2;   // 相位差 240°

  // 归一化权重
  const total = phase1 + phase2 + phase3;
  const w1 = phase1 / total;
  const w2 = phase2 / total;
  const w3 = phase3 / total;

  // 混合三个配色
  const c1 = FUSION_COLORS[0];
  const c2 = FUSION_COLORS[1];
  const c3 = FUSION_COLORS[2];

  state.targetColors.uColor1 = [
    c1.uColor1[0] * w1 + c2.uColor1[0] * w2 + c3.uColor1[0] * w3,
    c1.uColor1[1] * w1 + c2.uColor1[1] * w2 + c3.uColor1[1] * w3,
    c1.uColor1[2] * w1 + c2.uColor1[2] * w2 + c3.uColor1[2] * w3
  ];
  state.targetColors.uColor2 = [
    c1.uColor2[0] * w1 + c2.uColor2[0] * w2 + c3.uColor2[0] * w3,
    c1.uColor2[1] * w1 + c2.uColor2[1] * w2 + c3.uColor2[1] * w3,
    c1.uColor2[2] * w1 + c2.uColor2[2] * w2 + c3.uColor2[2] * w3
  ];
  state.targetColors.uColor3 = [
    c1.uColor3[0] * w1 + c2.uColor3[0] * w2 + c3.uColor3[0] * w3,
    c1.uColor3[1] * w1 + c2.uColor3[1] * w2 + c3.uColor3[1] * w3,
    c1.uColor3[2] * w1 + c2.uColor3[2] * w2 + c3.uColor3[2] * w3
  ];
  state.targetColors.uColor4 = [
    c1.uColor4[0] * w1 + c2.uColor4[0] * w2 + c3.uColor4[0] * w3,
    c1.uColor4[1] * w1 + c2.uColor4[1] * w2 + c3.uColor4[1] * w3,
    c1.uColor4[2] * w1 + c2.uColor4[2] * w2 + c3.uColor4[2] * w3
  ];
}

function animate(currentTime: number): void {
  requestAnimationFrame(animate);

  const dt = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // 累加时间：每帧增量 = dt * flowSpeed，速度变化时平滑过渡
  if (!state.isPaused) {
    accumulatedTime += dt * state.flowSpeed;
  }
  material.uniforms.uTime.value = accumulatedTime;
  material.uniforms.uDistortion.value = state.liquidStrength;

  // Smooth color transitions
  updateFusionColors(dt); // 更新融合主题颜色
  updateColors(dt);

  renderer.render(scene, camera);
}

// ============== UI Setup ==============
function createUI(root: HTMLElement): void {
  // UI Container
  const uiContainer = document.createElement('div');
  uiContainer.className = 'fluid-ui-container';

  // Toggle button - 放在 root 上，独立于 container
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'toggle-btn';
  toggleBtn.title = 'Toggle Controls';
  toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path>
  </svg>`;
  toggleBtn.addEventListener('click', () => {
    state.uiVisible = !state.uiVisible;
    uiContainer.classList.toggle('hidden', !state.uiVisible);
  });
  root.appendChild(toggleBtn);

  // Pause/Play button - 放在控制面板右上角
  const pauseBtn = document.createElement('button');
  pauseBtn.className = 'pause-btn';
  pauseBtn.title = 'Pause/Play';
  const updatePauseIcon = () => {
    pauseBtn.innerHTML = state.isPaused
      ? `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 5v14l11-7z"/></svg>`
      : `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  };
  updatePauseIcon();
  pauseBtn.addEventListener('click', () => {
    state.isPaused = !state.isPaused;
    updatePauseIcon();
  });
  uiContainer.appendChild(pauseBtn);

  // Title
  const title = document.createElement('div');
  title.className = 'fluid-ui-title';
  title.textContent = 'Effect Controls';
  uiContainer.appendChild(title);

  // Theme label
  const themeLabel = document.createElement('label');
  themeLabel.textContent = 'Color Theme';
  uiContainer.appendChild(themeLabel);

  // Theme grid
  const themeGrid = document.createElement('div');
  themeGrid.className = 'theme-grid';

  Object.keys(THEMES).forEach(themeName => {
    const btn = document.createElement('button');
    btn.className = 'theme-btn' + (themeName === state.currentTheme ? ' active' : '');
    btn.textContent = themeName;
    btn.addEventListener('click', () => {
      state.currentTheme = themeName;
      state.isFusionMode = false; // 退出融合模式
      state.targetColors = { ...THEMES[themeName] };
      themeGrid.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
    themeGrid.appendChild(btn);
  });

  // 添加融合主题按钮
  const fusionBtn = document.createElement('button');
  fusionBtn.className = 'theme-btn';
  fusionBtn.textContent = 'Fusion Loop';
  fusionBtn.addEventListener('click', () => {
    state.currentTheme = 'Fusion Loop';
    state.isFusionMode = true;
    themeGrid.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    fusionBtn.classList.add('active');
  });
  themeGrid.appendChild(fusionBtn);

  uiContainer.appendChild(themeGrid);

  // Flow Speed slider
  const flowLabel = document.createElement('label');
  flowLabel.innerHTML = 'Flow Speed <span id="flow-value">0.10</span>';
  uiContainer.appendChild(flowLabel);

  const flowSlider = document.createElement('input');
  flowSlider.type = 'range';
  flowSlider.min = '0';
  flowSlider.max = '0.5';
  flowSlider.step = '0.01';
  flowSlider.value = String(state.flowSpeed);
  flowSlider.addEventListener('input', () => {
    state.flowSpeed = parseFloat(flowSlider.value);
    document.getElementById('flow-value')!.textContent = state.flowSpeed.toFixed(2);
  });
  uiContainer.appendChild(flowSlider);

  // Liquid Strength slider
  const liquidLabel = document.createElement('label');
  liquidLabel.innerHTML = 'Liquid Strength <span id="liquid-value">0.35</span>';
  uiContainer.appendChild(liquidLabel);

  const liquidSlider = document.createElement('input');
  liquidSlider.type = 'range';
  liquidSlider.min = '0';
  liquidSlider.max = '1';
  liquidSlider.step = '0.01';
  liquidSlider.value = String(state.liquidStrength);
  liquidSlider.addEventListener('input', () => {
    state.liquidStrength = parseFloat(liquidSlider.value);
    document.getElementById('liquid-value')!.textContent = state.liquidStrength.toFixed(2);
  });
  uiContainer.appendChild(liquidSlider);

  root.appendChild(uiContainer);
}

// ============== Main Init ==============
function init(): void {
  const root = document.getElementById('root')!;

  // Create container
  const container = document.createElement('div');
  container.className = 'fluid-container';
  root.appendChild(container);

  // Initialize Three.js
  initThree(container);

  // Create UI
  createUI(root);

  // Start animation
  requestAnimationFrame(animate);
}

// Start app
init();
