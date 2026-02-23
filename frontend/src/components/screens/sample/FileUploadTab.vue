<template>
  <h2 class="section-title">FileUpload Component Guide</h2>

  <!-- ========================================
         Basic Usage
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">1. Basic Usage</h3>
    <p class="subsection-description">
      파일 선택 컴포넌트입니다. <code>v-model</code>로 선택된 파일을
      바인딩합니다.
    </p>

    <div class="example-box">
      <h4>Single File Upload</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="singleFile"
          placeholder="파일을 선택하세요"
          button-text="파일 선택"
          @change="handleSingleFileChange"
        />
      </div>

      <div class="result-display" v-if="singleFile">
        <strong>선택된 파일:</strong>
        <br />이름: {{ singleFile.name }} <br />크기:
        {{ formatFileSize(singleFile.size) }} <br />타입:
        {{ singleFile.type || "알 수 없음" }}
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
import FileUpload from '@/components/FileUpload.vue';
const singleFile = ref(null);

const handleFileChange = (file) => {
  console.log('선택된 파일:', file);
};
&lt;/script&gt;

&lt;template&gt;
  &lt;FileUpload
    v-model="singleFile"
    placeholder="파일을 선택하세요"
    button-text="파일 선택"
    @change="handleFileChange"
  /&gt;
&lt;/template&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Multiple File Upload</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="multipleFiles"
          placeholder="여러 파일을 선택하세요"
          button-text="파일 선택"
          :multiple="true"
          @change="handleMultipleFileChange"
        />
      </div>

      <div
        class="result-display"
        v-if="multipleFiles && multipleFiles.length > 0"
      >
        <strong>선택된 파일 ({{ multipleFiles.length }}개):</strong>
        <ul>
          <li v-for="(file, index) in multipleFiles" :key="index">
            {{ file.name }} ({{ formatFileSize(file.size) }})
          </li>
        </ul>
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  v-model="multipleFiles"
  :multiple="true"
  placeholder="여러 파일을 선택하세요"
/&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>:multiple="true"</code>를 설정하면 여러 파일을 동시에 선택할 수
        있습니다. 반환값은 <code>File[]</code> 배열입니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         File Type Restrictions
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">2. File Type Restrictions</h3>
    <p class="subsection-description">
      <code>accept</code> 속성으로 허용할 파일 타입을 제한할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Image Only</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="imageFile"
          accept="image/*"
          placeholder="이미지 파일만 선택 가능"
          button-text="이미지 선택"
          button-variant="success"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  v-model="imageFile"
  accept="image/*"
  button-text="이미지 선택"
/&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>PDF and Word Documents</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="documentFile"
          accept=".pdf,.doc,.docx"
          placeholder="PDF, Word 문서만 선택 가능"
          button-text="문서 선택"
          button-variant="primary"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  v-model="documentFile"
  accept=".pdf,.doc,.docx"
  button-text="문서 선택"
/&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Specific MIME Types</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="specificFile"
          accept="image/png,image/jpeg,application/pdf"
          placeholder="PNG, JPEG, PDF만 선택 가능"
          button-text="파일 선택"
          button-variant="secondary"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  accept="image/png,image/jpeg,application/pdf"
/&gt;</code></pre>
      </div>

      <p class="note">
        💡 <strong>accept 속성 사용법:</strong> <br />• <code>image/*</code> -
        모든 이미지 파일 <br />• <code>.pdf</code> - 특정 확장자 <br />•
        <code>image/png,image/jpeg</code> - 특정 MIME 타입 <br />•
        <code>.pdf,.doc,.docx</code> - 여러 확장자
      </p>
    </div>
  </section>

  <!-- ========================================
         File Size Limit
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">3. File Size Limit</h3>
    <p class="subsection-description">
      <code>max-size</code> 속성으로 최대 파일 크기를 MB 단위로 제한할 수
      있습니다.
    </p>

    <div class="example-box">
      <h4>5MB Limit</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="limitedFile"
          :max-size="5"
          placeholder="5MB 이하 파일만 업로드 가능"
          button-text="파일 선택"
          button-variant="warning"
          @error="handleError"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  v-model="file"
  :max-size="5"
  @error="handleError"
/&gt;

&lt;script setup&gt;
const handleError = (errorMessage) => {
  console.error(errorMessage);
  alert(errorMessage);
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note warning">
        ⚠️ 파일 크기가 제한을 초과하면 <code>@error</code> 이벤트가 발생하고,
        에러 메시지가 컴포넌트 하단에 표시됩니다.
      </p>
    </div>

    <div class="example-box">
      <h4>Multiple Files with Size Limit</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="limitedMultipleFiles"
          :multiple="true"
          :max-size="2"
          placeholder="각 파일 2MB 이하, 여러 파일 선택 가능"
          button-text="파일 선택"
          @error="handleMultipleError"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  :multiple="true"
  :max-size="2"
  @error="handleError"
/&gt;</code></pre>
      </div>

      <p class="note">
        💡 <code>:multiple="true"</code>와 함께 사용하면 각 파일마다 크기 검증이
        이루어집니다. 하나라도 초과하면 전체 선택이 취소됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Button Variants & Sizes
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">4. Button Variants & Sizes</h3>
    <p class="subsection-description">
      버튼 색상과 크기를 커스터마이징할 수 있습니다.
    </p>

    <div class="example-box">
      <h4>Button Variants</h4>
      <div class="upload-variants-grid">
        <FileUpload
          v-model="variantPrimary"
          button-variant="primary"
          button-text="Primary"
          placeholder="Primary 버튼"
        />
        <FileUpload
          v-model="variantSuccess"
          button-variant="success"
          button-text="Success"
          placeholder="Success 버튼"
        />
        <FileUpload
          v-model="variantDanger"
          button-variant="danger"
          button-text="Danger"
          placeholder="Danger 버튼"
        />
        <FileUpload
          v-model="variantWarning"
          button-variant="warning"
          button-text="Warning"
          placeholder="Warning 버튼"
        />
        <FileUpload
          v-model="variantSecondary"
          button-variant="secondary"
          button-text="Secondary"
          placeholder="Secondary 버튼"
        />
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload button-variant="primary" /&gt;
&lt;FileUpload button-variant="success" /&gt;
&lt;FileUpload button-variant="danger" /&gt;
&lt;FileUpload button-variant="warning" /&gt;
&lt;FileUpload button-variant="secondary" /&gt;</code></pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Button Sizes</h4>
      <div class="upload-sizes-demo">
        <div class="size-item">
          <label>Small (sm)</label>
          <FileUpload
            v-model="sizeSmall"
            button-size="sm"
            button-text="Small"
            placeholder="Small 크기"
          />
        </div>

        <div class="size-item">
          <label>Medium (md) - 기본</label>
          <FileUpload
            v-model="sizeMedium"
            button-size="md"
            button-text="Medium"
            placeholder="Medium 크기 (기본)"
          />
        </div>

        <div class="size-item">
          <label>Large (lg)</label>
          <FileUpload
            v-model="sizeLarge"
            button-size="lg"
            button-text="Large"
            placeholder="Large 크기"
          />
        </div>
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload button-size="sm" /&gt;
&lt;FileUpload button-size="md" /&gt;  &lt;!-- 기본값 --&gt;
&lt;FileUpload button-size="lg" /&gt;</code></pre>
      </div>

      <p class="note">
        💡 버튼 크기에 맞춰 입력 필드의 높이도 자동으로 조정됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Disabled State
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">5. Disabled State</h3>
    <p class="subsection-description">
      <code>:disabled="true"</code>로 비활성화 상태를 설정할 수 있습니다.
    </p>

    <div class="example-box">
      <div class="upload-demo">
        <FileUpload
          v-model="disabledFile"
          :disabled="isDisabled"
          placeholder="비활성화된 파일 업로드"
          button-text="파일 선택"
        />

        <button
          class="btn btn-secondary btn-sm"
          @click="isDisabled = !isDisabled"
          style="margin-top: 1rem"
        >
          {{ isDisabled ? "활성화" : "비활성화" }}
        </button>
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  v-model="file"
  :disabled="isDisabled"
/&gt;</code></pre>
      </div>

      <p class="note">
        💡 비활성화 상태에서는 버튼 클릭과 파일 삭제(×)가 모두 비활성화됩니다.
      </p>
    </div>
  </section>

  <!-- ========================================
         Events & Methods
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">6. Events & Methods</h3>
    <p class="subsection-description">
      FileUpload 컴포넌트가 제공하는 이벤트와 메서드입니다.
    </p>

    <div class="example-box">
      <h4>Events</h4>
      <div class="upload-demo">
        <FileUpload
          v-model="eventFile"
          @change="handleChange"
          @error="handleEventError"
        />
      </div>

      <div class="event-log" v-if="eventLog.length > 0">
        <strong>이벤트 로그:</strong>
        <ul>
          <li v-for="(log, index) in eventLog" :key="index">
            {{ log }}
          </li>
        </ul>
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload
  v-model="file"
  @change="handleChange"
  @error="handleError"
/&gt;

&lt;script setup&gt;
const handleChange = (file) => {
  if (file) {
    console.log('파일 선택됨:', file.name);
  } else {
    console.log('파일 삭제됨');
  }
};

const handleError = (errorMessage) => {
  console.error('에러 발생:', errorMessage);
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">
        💡 <strong>이벤트:</strong> <br />• <code>@change</code> - 파일이
        선택되거나 삭제될 때 발생 <br />• <code>@error</code> - 파일 크기 초과
        등 에러 발생 시
      </p>
    </div>

    <div class="example-box">
      <h4>Exposed Methods</h4>
      <div class="upload-demo">
        <FileUpload ref="fileUploadRef" v-model="methodFile" />

        <div class="method-buttons">
          <button class="btn btn-danger btn-sm" @click="clearFileMethod">
            clearFile() 호출
          </button>
          <button class="btn btn-primary btn-sm" @click="setFileMethod">
            setFile() 호출 (더미 파일)
          </button>
        </div>
      </div>

      <div class="code-example">
        <pre><code>&lt;FileUpload ref="fileUploadRef" v-model="file" /&gt;

&lt;script setup&gt;
const fileUploadRef = ref(null);

// 파일 삭제
const clearFile = () => {
  fileUploadRef.value.clearFile();
};

// 파일 직접 설정
const setFile = (file) => {
  fileUploadRef.value.setFile(file);
};
&lt;/script&gt;</code></pre>
      </div>

      <p class="note">
        💡 <strong>Exposed 메서드:</strong> <br />• <code>clearFile()</code> -
        선택된 파일 삭제 <br />• <code>setFile(file)</code> - 파일 직접 설정
      </p>
    </div>
  </section>

  <!-- ========================================
         Practical Examples
         ======================================== -->
  <section class="button-section">
    <h3 class="subsection-title">7. Practical Examples</h3>

    <div class="example-box">
      <h4>Form Integration</h4>
      <div class="form-demo">
        <div class="form-group">
          <label class="form-label">이름</label>
          <input type="text" class="form-control" v-model="formData.name" />
        </div>

        <div class="form-group">
          <label class="form-label">프로필 이미지</label>
          <FileUpload
            v-model="formData.profileImage"
            accept="image/*"
            :max-size="2"
            button-text="이미지 업로드"
            button-variant="success"
          />
        </div>

        <div class="form-group">
          <label class="form-label">첨부 문서 (여러 개 가능)</label>
          <FileUpload
            v-model="formData.documents"
            :multiple="true"
            accept=".pdf,.doc,.docx"
            :max-size="10"
            button-text="문서 업로드"
          />
        </div>

        <button class="btn btn-primary" @click="submitForm">제출</button>
      </div>

      <div class="result-display" v-if="formSubmitted">
        <strong>제출된 데이터:</strong>
        <pre>{{ formDataDisplay }}</pre>
      </div>
    </div>

    <div class="example-box">
      <h4>Image Preview</h4>
      <div class="image-preview-demo">
        <FileUpload
          v-model="previewImage"
          accept="image/*"
          button-text="이미지 선택"
          button-variant="success"
          @change="handleImageChange"
        />

        <div v-if="imagePreviewUrl" class="image-preview">
          <img :src="imagePreviewUrl" alt="미리보기" />
        </div>
      </div>

      <div class="code-example">
        <pre><code>&lt;script setup&gt;
const previewImage = ref(null);
const imagePreviewUrl = ref('');

const handleImageChange = (file) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreviewUrl.value = '';
  }
};
&lt;/script&gt;</code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FileUpload from "../FileUpload.vue";

// Basic
const singleFile = ref<File | null>(null);
const multipleFiles = ref<File[] | null>(null);

// File types
const imageFile = ref<File | null>(null);
const documentFile = ref<File | null>(null);
const specificFile = ref<File | null>(null);

// File size
const limitedFile = ref<File | null>(null);
const limitedMultipleFiles = ref<File[] | null>(null);

// Button variants
const variantPrimary = ref<File | null>(null);
const variantSuccess = ref<File | null>(null);
const variantDanger = ref<File | null>(null);
const variantWarning = ref<File | null>(null);
const variantSecondary = ref<File | null>(null);

// Button sizes
const sizeSmall = ref<File | null>(null);
const sizeMedium = ref<File | null>(null);
const sizeLarge = ref<File | null>(null);

// Disabled
const disabledFile = ref<File | null>(null);
const isDisabled = ref(true);

// Events
const eventFile = ref<File | null>(null);
const eventLog = ref<string[]>([]);

// Methods
const fileUploadRef = ref<any>(null);
const methodFile = ref<File | null>(null);

// Form
const formData = ref({
  name: "",
  profileImage: null as File | null,
  documents: null as File[] | null,
});
const formSubmitted = ref(false);

// Image preview
const previewImage = ref<File | null>(null);
const imagePreviewUrl = ref("");

// Handlers
const handleSingleFileChange = (file: File | null) => {
  console.log("Single file changed:", file);
};

const handleMultipleFileChange = (files: File[] | null) => {
  console.log("Multiple files changed:", files);
};

const handleError = (errorMessage: string) => {
  alert(errorMessage);
};

const handleMultipleError = (errorMessage: string) => {
  alert(errorMessage);
};

const handleChange = (file: File | null) => {
  if (file) {
    eventLog.value.push(`파일 선택: ${file.name}`);
  } else {
    eventLog.value.push("파일 삭제됨");
  }
};

const handleEventError = (errorMessage: string) => {
  eventLog.value.push(`에러: ${errorMessage}`);
};

const clearFileMethod = () => {
  fileUploadRef.value?.clearFile();
};

const setFileMethod = () => {
  const dummyFile = new File(["dummy content"], "test.txt", {
    type: "text/plain",
  });
  fileUploadRef.value?.setFile(dummyFile);
};

const submitForm = () => {
  if (!formData.value.name) {
    alert("이름을 입력하세요.");
    return;
  }
  formSubmitted.value = true;
  setTimeout(() => {
    formSubmitted.value = false;
  }, 5000);
};

const formDataDisplay = computed(() => ({
  name: formData.value.name,
  profileImage: formData.value.profileImage?.name || null,
  documents: formData.value.documents?.map((f) => f.name) || [],
}));

const handleImageChange = (file: File | null) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      imagePreviewUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreviewUrl.value = "";
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
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

.upload-demo {
  margin-bottom: $spacing-md;
}

.upload-variants-grid {
  display: grid;
  gap: $spacing-md;
}

.upload-sizes-demo {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.size-item {
  label {
    display: block;
    margin-bottom: $spacing-xs;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }
}

.result-display {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  margin-top: $spacing-md;
  line-height: 1.6;

  pre {
    margin-top: $spacing-sm;
    background: $color-bg-white;
    padding: $spacing-sm;
    border-radius: $radius-sm;
    overflow-x: auto;
    font-size: $font-size-xs;
  }

  ul {
    list-style: disc;
    padding-left: $spacing-lg;
    margin-top: $spacing-xs;
  }
}

.event-log {
  background: $color-bg-light;
  padding: $spacing-md;
  border-radius: $radius-sm;
  margin-top: $spacing-md;
  max-height: 200px;
  overflow-y: auto;

  ul {
    list-style: none;
    padding: 0;
    margin-top: $spacing-xs;
  }

  li {
    font-size: $font-size-xs;
    padding: $spacing-xs 0;
    border-bottom: 1px solid $color-border-light;

    &:last-child {
      border-bottom: none;
    }
  }
}

.method-buttons {
  display: flex;
  gap: $spacing-sm;
  margin-top: $spacing-md;
}

.form-demo {
  max-width: 600px;
}

.form-group {
  margin-bottom: $spacing-lg;
}

.form-label {
  display: block;
  margin-bottom: $spacing-xs;
  font-weight: $font-weight-medium;
  color: $color-text-primary;
  font-size: $font-size-sm;
}

.form-control {
  width: 100%;
  padding: $spacing-xs $spacing-md;
  border: $border-width solid $color-border;
  border-radius: $radius-md;
  font-size: $font-size-sm;

  &:focus {
    outline: none;
    border-color: $color-primary;
    box-shadow: 0 0 0 3px rgba($color-primary, 0.15);
  }
}

.image-preview-demo {
  display: flex;
  flex-direction: column;
  gap: $spacing-md;
}

.image-preview {
  margin-top: $spacing-md;
  border: 2px dashed $color-border;
  border-radius: $radius-md;
  padding: $spacing-md;
  text-align: center;

  img {
    max-width: 100%;
    max-height: 300px;
    object-fit: contain;
    border-radius: $radius-sm;
  }
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
  .upload-variants-grid {
    grid-template-columns: 1fr;
  }
}
</style>
