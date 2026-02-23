<template>
  <div>
    <h2 class="section-title">useConfig (ConfigStore)</h2>
    <p class="section-desc">
      파일 서버 IP와 API Base URL을 관리하는 Pinia 스토어입니다. 주로
      <code>getFileUrl()</code>을 통해 서버에 저장된 파일의 전체 URL을 생성할 때
      사용합니다.
    </p>

    <section class="style-section">
      <h3 class="subsection-title">getFileUrl — 파일 URL 생성</h3>
      <p class="description">
        서버에서 받아온 <code>logiPath</code>, <code>fileName</code>을 조합해
        완전한 파일 URL을 반환합니다. <code>fileName</code>이 비어 있거나
        <code>"null"</code>이면 기본 프로필 이미지를 반환합니다.
      </p>

      <div class="demo-box">
        <div class="url-demo">
          <div class="url-demo-row">
            <span class="url-label">logiPath</span>
            <code>/uploads/profile/</code>
          </div>
          <div class="url-demo-row">
            <span class="url-label">fileName</span>
            <code>abc123.jpg</code>
          </div>
          <div class="url-demo-row url-demo-row--result">
            <span class="url-label">결과 URL</span>
            <code
              >http://192.168.0.130/serverfile/uploads/profile/abc123.jpg</code
            >
          </div>
          <div class="url-demo-row url-demo-row--fallback">
            <span class="url-label">빈 fileName</span>
            <code>→ default_profile.jpg (기본 이미지)</code>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import { useConfigStore } from '@/hooks/useConfig';

const configStore = useConfigStore();

// 파일 URL 생성 (getter 함수 호출)
const avatarUrl = configStore.getFileUrl('/uploads/profile/', user.profileImg);
// → 'http://192.168.0.130/serverfile/uploads/profile/abc123.jpg'
// fileName이 null, '', 'null' 이면 → 기본 프로필 이미지 경로

// 템플릿에서 바로 사용
&lt;img :src="configStore.getFileUrl('/uploads/profile/', user.profileImg)" /&gt;

// 상태값 직접 접근 (필요 시)
configStore.fileServerIp  // 'http://192.168.0.130'
configStore.apiBaseUrl    // 'http://localhost:80'</code></pre>
        <div class="class-guide">
          <h5>State</h5>
          <ul>
            <li>
              <code>fileServerIp</code> — 파일 서버 주소
              (<code>http://192.168.0.130</code>)
            </li>
            <li>
              <code>apiBaseUrl</code> — API 서버 주소
              (<code>http://localhost:80</code>)
            </li>
          </ul>
          <h5 style="margin-top: 12px">Getter</h5>
          <ul>
            <li>
              <code>getFileUrl(logiPath, fileName)</code>
              — 완전한 파일 URL 반환.
              <code>fileName</code>이 없으면
              <code>default_profile.jpg</code> 반환
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// 데모용 스크립트 없음
</script>

<style scoped lang="scss">
.section-title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
  padding-bottom: $spacing-lg;
  border-bottom: 2px solid $color-primary;
}
.section-desc {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-3xl;
  line-height: 1.7;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: $font-size-sm;
    font-family: monospace;
  }
}
.style-section {
  margin-bottom: $spacing-3xl;
}
.subsection-title {
  font-size: $font-size-xl;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-md;
}
.description {
  font-size: $font-size-base;
  color: $color-text-secondary;
  margin-bottom: $spacing-lg;
  line-height: 1.6;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: $font-size-sm;
    font-family: monospace;
  }
}
.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}
.url-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.url-demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: $font-size-sm;
    font-family: monospace;
  }
  &--result {
    background: #e8f5e9;
    code {
      background: #c8e6c9;
      color: #1b5e20;
    }
  }
  &--fallback {
    background: #fff8e1;
    code {
      background: #fff3cd;
      color: #7c5200;
    }
  }
}
.url-label {
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  min-width: 100px;
  flex-shrink: 0;
}
.code-explanation {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: 0 0 $spacing-sm 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
    }
  }
}
.class-guide {
  margin-top: $spacing-md;
  padding: $spacing-md;
  background: white;
  border-radius: $radius-sm;
  h5 {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      padding: $spacing-xs 0;
      font-size: $font-size-sm;
      color: $color-text-secondary;
      line-height: 1.6;
      code {
        background: #e3f2fd;
        color: #1976d2;
        padding: 2px 7px;
        border-radius: $radius-sm;
        font-size: $font-size-xs;
        font-weight: $font-weight-semibold;
        font-family: monospace;
        margin-right: 4px;
      }
    }
  }
}
</style>
