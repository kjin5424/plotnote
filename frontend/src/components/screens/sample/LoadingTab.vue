<template>
  <h2 class="section-title">Loading Component Guide</h2>

  <!-- ========================================
         Basic Usage
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic Usage</h3>
    <p class="subsection-description">
      전역 로딩 오버레이 컴포넌트입니다. <code>commonStore.isLoading</code> 상태에 따라 자동으로 표시됩니다.
    </p>

    <div class="example-box">
      <h4>Global Loading Overlay</h4>
      <p class="info-text">
        Loading 컴포넌트는 <strong>App.vue 또는 Layout 컴포넌트에 한 번만 추가</strong>하면 됩니다.
        이후 어디서든 <code>commonStore</code>를 통해 로딩 상태를 제어할 수 있습니다.
      </p>

      <div class="code-example">
        <pre><code>&lt;!-- App.vue 또는 Layout.vue --&gt;
&lt;template&gt;
  &lt;Loading /&gt;  &lt;!-- 전역 로딩 오버레이 --&gt;
  &lt;RouterView /&gt;
&lt;/template&gt;

&lt;script setup&gt;
import Loading from '@/components/Loading.vue';
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">
        💡 Loading 컴포넌트는 <code>z-index: 9999</code>로 설정되어 있어 
        모든 컨텐츠 위에 표시됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Usage with Store
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. Control with Store</h3>
    <p class="subsection-description">
      <code>useCommonStore()</code>를 사용하여 로딩 상태를 제어합니다.
    </p>

    <div class="example-box">
      <h4>Show/Hide Loading</h4>

      <div class="demo-buttons">
        <button class="btn btn-primary" @click="showLoading">
          로딩 표시 (3초)
        </button>
        <button class="btn btn-secondary" @click="showLoadingManual">
          로딩 표시 (수동)
        </button>
        <button class="btn btn-danger" @click="hideLoading">
          로딩 숨기기
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
import { useCommonStore } from '@/stores/commonStore';

const commonStore = useCommonStore();

// 로딩 표시
const showLoading = () => {
  commonStore.setLoading(true);
  
  // 3초 후 자동으로 숨김
  setTimeout(() => {
    commonStore.setLoading(false);
  }, 3000);
};

// 로딩 숨김
const hideLoading = () => {
  commonStore.setLoading(false);
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>commonStore.setLoading(true/false)</code>로 간단하게 제어할 수 있습니다.
      </p>
    </div>

    <div class="example-box">
      <h4>With Async Operations</h4>

      <div class="demo-buttons">
        <button class="btn btn-success" @click="fetchData">
          API 호출 시뮬레이션
        </button>
      </div>

      <div class="result-display" v-if="apiResult">
        <strong>API 결과:</strong> {{ apiResult }}
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
const commonStore = useCommonStore();

const fetchData = async () => {
  try {
    // 로딩 시작
    commonStore.setLoading(true);
    
    // API 호출
    const response = await fetch('/api/data');
    const data = await response.json();
    
    console.log('데이터:', data);
  } catch (error) {
    console.error('에러:', error);
  } finally {
    // 로딩 종료
    commonStore.setLoading(false);
  }
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note warning">
        ⚠️ <strong>중요:</strong> <code>finally</code> 블록에서 반드시 
        <code>setLoading(false)</code>를 호출하여 에러 발생 시에도 로딩이 종료되도록 해야 합니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Axios Interceptor Integration
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. Axios Interceptor Integration</h3>
    <p class="subsection-description">
      Axios 인터셉터를 사용하면 모든 HTTP 요청에 대해 자동으로 로딩을 표시할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Automatic Loading for All Requests</h4>

      <div class="code-example">
        <pre><code>// src/plugins/axios.ts
import axios from 'axios';
import { useCommonStore } from '@/stores/commonStore';

// Request 인터셉터
axios.interceptors.request.use(
  (config) => {
    const commonStore = useCommonStore();
    commonStore.setLoading(true);
    return config;
  },
  (error) => {
    const commonStore = useCommonStore();
    commonStore.setLoading(false);
    return Promise.reject(error);
  }
);

// Response 인터셉터
axios.interceptors.response.use(
  (response) => {
    const commonStore = useCommonStore();
    commonStore.setLoading(false);
    return response;
  },
  (error) => {
    const commonStore = useCommonStore();
    commonStore.setLoading(false);
    return Promise.reject(error);
  }
);

export default axios;</code></pre>
      </div>

      <p class="note">
        💡 이렇게 설정하면 모든 API 요청에 대해 자동으로 로딩이 표시되고 숨겨집니다.
      </p>
    </div>

    <div class="example-box">
      <h4>Selective Loading (특정 요청만)</h4>

      <div class="code-example">
        <pre><code>// 특정 요청에만 로딩 표시
const config = {
  headers: {
    'X-Show-Loading': 'true'  // 커스텀 헤더
  }
};

// Request 인터셉터
axios.interceptors.request.use((config) => {
  if (config.headers['X-Show-Loading']) {
    const commonStore = useCommonStore();
    commonStore.setLoading(true);
  }
  return config;
});

// 사용 예시
axios.get('/api/data', { 
  headers: { 'X-Show-Loading': 'true' } 
});</code></pre>
      </div>

      <p class="note">
        💡 특정 요청에만 로딩을 표시하고 싶다면 커스텀 헤더를 활용할 수 있습니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Custom Styling
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Custom Styling</h3>
    <p class="subsection-description">
      필요에 따라 로딩 스피너의 스타일을 커스터마이징할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Default Styling</h4>

      <div class="code-example">
        <pre><code>// Loading.vue의 기본 스타일
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);  // 반투명 검은 배경
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  backdrop-filter: blur(2px);  // 배경 블러 효과
}

.loading-spinner {
  /* 스피너 스타일 (프로젝트마다 다를 수 있음) */
}</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Customization Tips</h4>

      <div class="customization-grid">
        <div class="custom-item">
          <h5>배경 색상 변경</h5>
          <div class="code-example">
            <pre><code>// 더 어두운 배경
background-color: rgba(0, 0, 0, 0.8);

// 흰색 배경
background-color: rgba(255, 255, 255, 0.9);</code></pre>
          </div>
        </div>

        <div class="custom-item">
          <h5>블러 효과 조정</h5>
          <div class="code-example">
            <pre><code>// 더 강한 블러
backdrop-filter: blur(5px);

// 블러 제거
backdrop-filter: none;</code></pre>
          </div>
        </div>

        <div class="custom-item">
          <h5>애니메이션 속도 조정</h5>
          <div class="code-example">
            <pre><code>// 더 빠른 페이드인
.loading-fade-enter-active {
  transition: opacity 0.1s ease;
}

// 더 느린 페이드인
.loading-fade-enter-active {
  transition: opacity 0.5s ease;
}</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ========================================
         Best Practices
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Best Practices</h3>

    <div class="example-box">
      <h4>✅ 권장사항</h4>
      <ul class="best-practices-list">
        <li>
          <strong>항상 finally 블록 사용</strong>
          <br>에러 발생 시에도 로딩이 종료되도록 <code>finally</code> 블록에서 <code>setLoading(false)</code> 호출
        </li>
        <li>
          <strong>중첩된 요청 주의</strong>
          <br>여러 API를 동시에 호출할 때는 카운터 방식으로 로딩 관리 고려
        </li>
        <li>
          <strong>빠른 응답에는 로딩 생략</strong>
          <br>100ms 미만의 빠른 요청에는 로딩을 표시하지 않아 깜빡임 방지
        </li>
        <li>
          <strong>사용자 피드백 제공</strong>
          <br>긴 작업(5초 이상)에는 진행 상태나 메시지 표시 고려
        </li>
      </ul>
    </div>

    <div class="example-box">
      <h4>❌ 피해야 할 패턴</h4>
      <ul class="bad-practices-list">
        <li>
          <strong>finally 없이 try-catch만 사용</strong>
          <br>→ 에러 발생 시 로딩이 영원히 표시될 수 있음
        </li>
        <li>
          <strong>중첩된 로딩 호출</strong>
          <br>→ A 함수에서 로딩 시작, B 함수에서도 로딩 시작하면 제어 복잡해짐
        </li>
        <li>
          <strong>로딩 없이 긴 작업 수행</strong>
          <br>→ 사용자가 앱이 멈춘 것으로 오해할 수 있음
        </li>
      </ul>
    </div>
  </section>

  <!-- ========================================
         Advanced: Loading Counter
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Advanced: Loading Counter</h3>
    <p class="subsection-description">
      여러 API를 동시에 호출할 때 카운터 방식으로 로딩을 관리하는 방법입니다.
    </p>

    <div class="example-box">
      <h4>Store with Counter</h4>

      <div class="code-example">
        <pre><code>// commonStore.ts (개선된 버전)
import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    loadingCount: 0,  // 로딩 카운터
  }),
  
  getters: {
    isLoading: (state) => state.loadingCount > 0,
  },
  
  actions: {
    startLoading() {
      this.loadingCount++;
    },
    
    stopLoading() {
      if (this.loadingCount > 0) {
        this.loadingCount--;
      }
    },
    
    resetLoading() {
      this.loadingCount = 0;
    },
  },
});

// 사용 예시
const fetchMultiple = async () => {
  const store = useCommonStore();
  
  try {
    store.startLoading();  // 카운터 1
    const data1 = await fetch('/api/data1');
    
    store.startLoading();  // 카운터 2
    const data2 = await fetch('/api/data2');
    
    store.stopLoading();   // 카운터 1
    store.stopLoading();   // 카운터 0 (로딩 종료)
  } catch (error) {
    store.resetLoading();  // 에러 시 카운터 리셋
  }
};</code></pre>
      </div>

      <p class="note">
        💡 카운터 방식을 사용하면 여러 요청이 동시에 진행될 때 
        모든 요청이 완료될 때까지 로딩을 유지할 수 있습니다.
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCommonStore } from '@/stores/commonStore';

const commonStore = useCommonStore();
const apiResult = ref('');

const showLoading = () => {
  commonStore.setLoading(true);
  setTimeout(() => {
    commonStore.setLoading(false);
  }, 3000);
};

const showLoadingManual = () => {
  commonStore.setLoading(true);
};

const hideLoading = () => {
  commonStore.setLoading(false);
};

const fetchData = async () => {
  try {
    commonStore.setLoading(true);
    
    // 가짜 API 호출 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    apiResult.value = 'API 호출 성공! (2초 소요)';
    
    setTimeout(() => {
      apiResult.value = '';
    }, 3000);
  } catch (error) {
    console.error('에러:', error);
    apiResult.value = 'API 호출 실패';
  } finally {
    commonStore.setLoading(false);
  }
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables.scss" as *;

.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-3xl;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $color-primary;
}

.button-section {
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: $color-bg-light;
  border-radius: $radius-lg;
}

.subsection-title {
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
  padding-bottom: $spacing-sm;
  border-bottom: 2px solid $color-border-light;
}

.subsection-description {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
}

.example-box {
  background: $color-bg-white;
  padding: $spacing-xl;
  border-radius: $radius-md;
  margin-bottom: $spacing-lg;
  box-shadow: $shadow-sm;
}

.example-box h4 {
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}

.example-box h5 {
  font-size: $font-size-md;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
}

.info-text {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  line-height: 1.6;
  margin-bottom: $spacing-md;
}

.demo-buttons {
  display: flex;
  gap: $spacing-sm;
  flex-wrap: wrap;
  margin-bottom: $spacing-md;
}

.result-display {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  margin-top: $spacing-md;
}

.customization-grid {
  display: grid;
  gap: $spacing-md;
}

.custom-item {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
}

.best-practices-list,
.bad-practices-list {
  list-style: none;
  padding: 0;

  li {
    padding: $spacing-md;
    margin-bottom: $spacing-sm;
    border-radius: $radius-sm;
    font-size: $font-size-sm;
    line-height: 1.6;

    strong {
      display: block;
      margin-bottom: $spacing-xs;
      font-size: $font-size-md;
    }
  }
}

.best-practices-list li {
  background: rgba($color-success, 0.05);
  border-left: 4px solid $color-success;
}

.bad-practices-list li {
  background: rgba($color-danger, 0.05);
  border-left: 4px solid $color-danger;
}

.code-example {
  background: $color-bg-light;
  border-left: 4px solid $color-primary;
  padding: $spacing-md;
  border-radius: $radius-sm;
  margin-top: $spacing-md;
  overflow-x: auto;
}

.code-example pre {
  margin: 0;
  font-family: "Courier New", monospace;
  font-size: $font-size-xs;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.code-example code {
  color: $color-text-primary;
}

.note {
  background: #e3f2fd;
  border-left: 4px solid $color-primary;
  padding: $spacing-sm $spacing-md;
  margin-top: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  color: #1976d2;
  line-height: 1.6;

  &.warning {
    background: #fff3cd;
    border-left-color: #ffc107;
    color: #856404;
  }
}

@media (max-width: $breakpoint-md) {
  .demo-buttons {
    flex-direction: column;

    .btn {
      width: 100%;
    }
  }
}
</style>
