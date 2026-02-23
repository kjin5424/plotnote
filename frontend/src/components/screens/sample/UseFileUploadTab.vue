<template>
  <div>
    <h2 class="section-title">useFileUpload</h2>
    <p class="section-desc">
      파일 선택/검증/미리보기/업로드를 통합 관리하는 훅입니다. 드래그 앤 드롭,
      진행률 추적, 단일/다중 파일, 재업로드까지 지원합니다.
    </p>

    <!-- ==================== 1. Live Demo ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">Live Demo</h3>

      <div class="demo-box">
        <!-- 드롭존 -->
        <div
          class="drop-zone"
          :class="{ 'drop-zone--over': isDragOver }"
          @dragover.prevent="isDragOver = true"
          @dragleave="isDragOver = false"
          @drop.prevent="handleDrop"
          @click="fileInput?.click()"
        >
          <input
            ref="fileInput"
            type="file"
            multiple
            accept="image/*,.pdf"
            hidden
            @change="handleChange"
          />
          <div class="drop-zone-content">
            <span class="drop-icon">📁</span>
            <p>클릭하거나 파일을 드래그하세요</p>
            <p class="drop-hint">이미지, PDF · 최대 5MB · 최대 5개</p>
          </div>
        </div>

        <!-- 파일 목록 -->
        <div v-if="files.length" class="file-list">
          <div v-for="f in files" :key="f.id" class="file-item">
            <div class="file-preview-wrap">
              <img
                v-if="f.preview && f.type.startsWith('image/')"
                :src="f.preview"
                class="file-thumb"
              />
              <span v-else class="file-icon">📄</span>
            </div>
            <div class="file-info">
              <span class="file-name">{{ f.name }}</span>
              <span class="file-size">{{ formatSize(f.size) }}</span>
              <div class="file-progress" v-if="f.status === 'uploading'">
                <div
                  class="progress-bar"
                  :style="{ width: f.progress + '%' }"
                ></div>
              </div>
            </div>
            <span class="file-status" :class="`status-${f.status}`">
              {{ statusLabel[f.status] }}
            </span>
            <button class="file-remove" @click="removeFile(f.id)">✕</button>
          </div>
        </div>

        <div class="demo-actions" v-if="files.length">
          <span class="demo-info"
            >{{ files.length }}개 ·
            {{ isUploading ? `${progress}% 업로드 중` : "준비됨" }}</span
          >
          <button class="btn btn-outline" @click="clearFiles">전체 삭제</button>
          <button
            class="btn btn-primary"
            :disabled="isUploading"
            @click="simulateUpload"
          >
            업로드 시뮬레이션
          </button>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import { useFileUpload } from '@/hooks/useFileUpload';

const {
  files, isUploading, previews, progress,
  pendingCount, successCount, errorCount, isAllCompleted,
  addFiles, removeFile, clearFiles,
  uploadFiles, retryUpload, downloadFile,
  handleDrop, handleDragOver,
} = useFileUpload({
  accept:         ['image/*', 'application/pdf'],
  maxSize:        5,           // MB
  multiple:       true,
  maxFiles:       5,
  uploadUrl:      '/api/upload',
  autoUpload:     false,       // true면 파일 추가 시 즉시 업로드
  additionalData: { category: 'assignment' },  // FormData에 추가될 데이터
  onSuccess: (file, response) => {
    console.log('업로드 성공:', response.fileId);
  },
  onError: (file, error) => {
    console.error('업로드 실패:', file.name);
  },
  onProgress: (file, percent) => {
    console.log(`${file.name}: ${percent}%`);
  },
});</code></pre>
      </div>
    </section>

    <!-- ==================== 2. 반환값 레퍼런스 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">반환값 레퍼런스</h3>
      <div class="code-explanation">
        <div class="class-guide" style="margin-top: 0">
          <h5>UploadedFile 구조</h5>
          <pre
            style="
              background: #f3f4f6;
              color: #1f2937;
              padding: 10px;
              border-radius: 6px;
              font-size: 12px;
              margin: 8px 0;
            "
          >
interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;           // bytes
  type: string;           // MIME 타입
  preview?: string;       // 이미지/PDF base64 미리보기 URL
  progress?: number;      // 0 ~ 100
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  response?: any;         // 업로드 성공 시 서버 응답
}</pre
          >
          <h5>상태</h5>
          <ul>
            <li>
              <code>files</code> <em>Ref&lt;UploadedFile[]&gt;</em> — 전체 파일
              목록
            </li>
            <li>
              <code>isUploading</code> <em>Ref&lt;boolean&gt;</em> — 업로드 진행
              중 여부
            </li>
            <li>
              <code>previews</code> — <em>{ id, url, name }[]</em> 미리보기 목록
            </li>
            <li><code>progress</code> — 전체 평균 진행률 (0~100)</li>
            <li>
              <code>pendingCount / successCount / errorCount</code> — 상태별
              파일 수
            </li>
            <li><code>isAllCompleted</code> — 모든 파일 처리 완료 여부</li>
          </ul>
          <h5 style="margin-top: 12px">메서드</h5>
          <ul>
            <li>
              <code>addFiles(fileList)</code> — FileList 또는 File[] 추가. 검증
              자동 실행
            </li>
            <li>
              <code>removeFile(id)</code> — 파일 제거 (미리보기 URL 자동 해제)
            </li>
            <li><code>clearFiles()</code> — 전체 파일 제거</li>
            <li>
              <code>uploadFiles(ids?)</code> — 업로드 실행. ids 생략 시 pending
              전체
            </li>
            <li><code>retryUpload(id)</code> — 실패한 파일 재업로드</li>
            <li><code>downloadFile(id)</code> — 파일 다운로드</li>
            <li>
              <code>handleDrop(event)</code> — 드래그 앤 드롭 이벤트 핸들러
            </li>
            <li><code>handleDragOver(event)</code> — dragover 이벤트 핸들러</li>
            <li><code>reset()</code> — 전체 초기화</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== 3. 사용 패턴 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">사용 패턴</h3>
      <div class="code-explanation">
        <h4>드래그 앤 드롭 영역</h4>
        <pre><code>&lt;div
  @dragover="handleDragOver"
  @drop="handleDrop"
  @click="$refs.fileInput.click()"
&gt;
  &lt;input ref="fileInput" type="file" hidden multiple @change="addFiles($event.target.files)" /&gt;
  파일을 드래그하거나 클릭하세요
&lt;/div&gt;</code></pre>

        <h4>파일 업로드 후 서버 응답 활용</h4>
        <pre><code>const { files, uploadFiles } = useFileUpload({
  uploadUrl: '/api/upload',
  onSuccess: (file, response) => {
    // 서버가 { fileId, logiPath, fileName } 형태로 반환한다고 가정
    savedFileIds.push(response.fileId);
  }
});

// 폼 제출 시 업로드 먼저 실행 후 폼 데이터에 파일 ID 포함
const handleFormSubmit = async () => {
  await uploadFiles();
  const allSuccess = files.value.every(f => f.status === 'success');
  if (!allSuccess) return;

  await post('/api/assignments', {
    ...formValues,
    fileIds: files.value.map(f => f.response.fileId),
  });
};</code></pre>

        <h4>useImageProcessor — 이미지 리사이즈</h4>
        <pre><code>import { useImageProcessor } from '@/hooks/useFileUpload';

const { resizeImage } = useImageProcessor();

const handleProfileImage = async (file: File) => {
  const resized = await resizeImage(file, {
    maxWidth: 800,
    maxHeight: 800,
    quality: 0.85,
  });
  // resized → 리사이즈된 File 객체 (타입, 이름 유지)
  await uploadFile('/api/profile', new FormData().append('file', resized));
};</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface DemoFile {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
  progress?: number;
  status: "pending" | "uploading" | "success" | "error";
}

const fileInput = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);
const files = ref<DemoFile[]>([]);
const isUploading = ref(false);
const progress = ref(0);

const statusLabel: Record<string, string> = {
  pending: "대기",
  uploading: "업로드 중",
  success: "완료",
  error: "실패",
};

const formatSize = (bytes: number) => {
  if (bytes < 1024) return bytes + "B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + "KB";
  return (bytes / 1024 / 1024).toFixed(1) + "MB";
};

const generateId = () =>
  `file_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

const addFiles = async (fileList: FileList | null) => {
  if (!fileList) return;
  for (const file of Array.from(fileList)) {
    if (files.value.length >= 5) {
      alert("최대 5개까지 가능합니다.");
      break;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name}: 5MB 초과`);
      continue;
    }
    const df: DemoFile = {
      id: generateId(),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending",
      progress: 0,
    };
    if (file.type.startsWith("image/")) {
      df.preview = await new Promise((res) => {
        const r = new FileReader();
        r.onload = (e) => res(e.target?.result as string);
        r.readAsDataURL(file);
      });
    }
    files.value.push(df);
  }
};
const handleChange = (e: Event) =>
  addFiles((e.target as HTMLInputElement).files);
const handleDrop = (e: DragEvent) => {
  isDragOver.value = false;
  addFiles(e.dataTransfer?.files ?? null);
};
const removeFile = (id: string) => {
  files.value = files.value.filter((f) => f.id !== id);
};
const clearFiles = () => {
  files.value = [];
};

const simulateUpload = async () => {
  isUploading.value = true;
  for (const f of files.value.filter((f) => f.status === "pending")) {
    f.status = "uploading";
    for (let p = 0; p <= 100; p += 20) {
      f.progress = p;
      progress.value = p;
      await new Promise((r) => setTimeout(r, 100));
    }
    f.status = Math.random() > 0.15 ? "success" : "error";
  }
  isUploading.value = false;
};
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
.demo-box {
  padding: $spacing-xl;
  background: white;
  border-radius: $radius-md;
  border: 1px solid $color-border-light;
  margin-bottom: $spacing-lg;
}

.drop-zone {
  border: 2px dashed $color-border;
  border-radius: $radius-md;
  padding: $spacing-3xl;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  background: $color-bg-light;
  &:hover,
  &--over {
    border-color: $color-primary;
    background: rgba($color-primary, 0.04);
  }
}
.drop-zone-content {
  pointer-events: none;
}
.drop-icon {
  font-size: 32px;
  display: block;
  margin-bottom: 8px;
}
.drop-zone-content p {
  margin: 4px 0;
  font-size: $font-size-sm;
  color: $color-text-secondary;
}
.drop-hint {
  font-size: $font-size-xs !important;
  color: $color-text-light !important;
}

.file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: $spacing-md;
}
.file-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  border: 1px solid $color-border-light;
}
.file-preview-wrap {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.file-thumb {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: $radius-sm;
}
.file-icon {
  font-size: 24px;
}
.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}
.file-name {
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.file-size {
  font-size: $font-size-xs;
  color: $color-text-light;
}
.file-progress {
  height: 4px;
  background: $color-border-light;
  border-radius: 2px;
  overflow: hidden;
  margin-top: 2px;
}
.progress-bar {
  height: 100%;
  background: $color-primary;
  border-radius: 2px;
  transition: width 0.1s;
}
.file-status {
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  white-space: nowrap;
  flex-shrink: 0;
  &.status-pending {
    color: $color-text-light;
  }
  &.status-uploading {
    color: $color-primary;
  }
  &.status-success {
    color: $color-success;
  }
  &.status-error {
    color: $color-danger;
  }
}
.file-remove {
  background: none;
  border: none;
  color: $color-text-light;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  border-radius: $radius-sm;
  &:hover {
    background: $color-border-light;
    color: $color-danger;
  }
}
.demo-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: $spacing-md;
  justify-content: flex-end;
}
.demo-info {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-right: auto;
}
.btn {
  padding: 8px 16px;
  border: none;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: all 0.15s;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
.btn-primary {
  background: $color-primary;
  color: white;
}
.btn-outline {
  background: white;
  color: $color-text-primary;
  border: 1px solid $color-border;
  &:hover {
    border-color: $color-primary;
    color: $color-primary;
  }
}

.code-explanation {
  background: $color-bg-light;
  border-radius: $radius-md;
  padding: $spacing-lg;
  border-left: 4px solid $color-primary;
  h4 {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin: $spacing-lg 0 $spacing-sm 0;
    &:first-child {
      margin-top: 0;
    }
  }
  pre {
    background: #2d2d2d;
    color: #f8f8f2;
    padding: $spacing-md;
    border-radius: $radius-sm;
    overflow-x: auto;
    margin: $spacing-sm 0;
    font-size: $font-size-sm;
    line-height: 1.6;
    code {
      font-family: "Consolas", monospace;
      white-space: pre;
    }
  }
}
.class-guide {
  margin-top: $spacing-lg;
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
      em {
        color: $color-text-light;
        font-style: normal;
      }
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
  pre {
    background: #f3f4f6;
    color: #1f2937;
    padding: 10px;
    border-radius: 6px;
    font-size: 12px;
    margin: 8px 0;
    font-family: monospace;
    overflow-x: auto;
  }
}
</style>
