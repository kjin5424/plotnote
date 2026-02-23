<template>
  <div>
    <h2 class="section-title">fileHelper</h2>
    <p class="section-desc">
      파일 처리 유틸리티입니다. 파일 정보 추출, 타입 판별, 포맷 변환, 다운로드
      등 파일과 관련된 공통 작업을 처리합니다.
    </p>

    <!-- ==================== 1. formatFileSize 데모 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">formatFileSize — 파일 크기 표시</h3>

      <div class="demo-box">
        <div class="size-demo-row">
          <label class="ctrl-label">바이트 입력:</label>
          <input
            v-model.number="sizeInput"
            type="number"
            class="size-input"
            min="0"
          />
          <span class="size-result"
            >→ <strong>{{ formatSize(sizeInput) }}</strong></span
          >
        </div>
        <div class="size-examples">
          <div
            v-for="ex in sizeExamples"
            :key="ex.bytes"
            class="size-chip"
            @click="sizeInput = ex.bytes"
          >
            <span class="chip-bytes">{{ ex.label }}</span>
            <span class="chip-result">{{ formatSize(ex.bytes) }}</span>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import { formatFileSize } from '@/utils/fileHelper';

formatFileSize(0)            // '0 Bytes'
formatFileSize(1024)         // '1 KB'
formatFileSize(1536000)      // '1.46 MB'
formatFileSize(1536000, 1)   // '1.5 MB'  ← 소수점 자릿수 지정
formatFileSize(1073741824)   // '1 GB'</code></pre>
      </div>
    </section>

    <!-- ==================== 2. 파일 정보 추출 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">파일명 / 확장자 처리</h3>

      <div class="demo-box">
        <div class="filename-demo">
          <label class="ctrl-label">파일명 입력:</label>
          <input
            v-model="filenameInput"
            type="text"
            class="size-input"
            placeholder="example.pdf"
          />
        </div>
        <div class="filename-results">
          <div class="fname-row">
            <code>getFileExtension</code><span class="arrow">→</span
            ><strong>{{ getExt(filenameInput) || "(없음)" }}</strong>
          </div>
          <div class="fname-row">
            <code>getFileNameWithoutExtension</code><span class="arrow">→</span
            ><strong>{{ getNameNoExt(filenameInput) }}</strong>
          </div>
          <div class="fname-row">
            <code>getMimeType</code><span class="arrow">→</span
            ><strong>{{ getMime(filenameInput) }}</strong>
          </div>
          <div class="fname-row">
            <code>getFileIcon</code><span class="arrow">→</span
            ><strong>{{ getIcon(filenameInput) }}</strong>
          </div>
          <div class="fname-row">
            <code>sanitizeFilename</code><span class="arrow">→</span
            ><strong>{{ sanitize(filenameInput) }}</strong>
          </div>
          <div class="type-badges">
            <span
              class="type-badge"
              :class="isImage(filenameInput) ? 'badge-on' : 'badge-off'"
              >isImageFile</span
            >
            <span
              class="type-badge"
              :class="isVideo(filenameInput) ? 'badge-on' : 'badge-off'"
              >isVideoFile</span
            >
            <span
              class="type-badge"
              :class="isAudio(filenameInput) ? 'badge-on' : 'badge-off'"
              >isAudioFile</span
            >
            <span
              class="type-badge"
              :class="isDoc(filenameInput) ? 'badge-on' : 'badge-off'"
              >isDocumentFile</span
            >
            <span
              class="type-badge"
              :class="isArchive(filenameInput) ? 'badge-on' : 'badge-off'"
              >isArchiveFile</span
            >
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import {
  getFileExtension, getFileNameWithoutExtension, getMimeType,
  getFileIcon, sanitizeFilename,
  isImageFile, isVideoFile, isAudioFile, isDocumentFile, isArchiveFile,
} from '@/utils/fileHelper';

getFileExtension('report.PDF')            // 'pdf'  ← 항상 소문자
getFileNameWithoutExtension('report.pdf') // 'report'
getMimeType('image.jpg')                  // 'image/jpeg'
getFileIcon('document.pdf')               // 'fa-file-pdf'
sanitizeFilename('my file (1).pdf')       // 'my_file_1.pdf'  ← 특수문자 → _

isImageFile('photo.jpg')    // true
isDocumentFile('data.xlsx') // true
isArchiveFile('backup.zip') // true</code></pre>
      </div>
    </section>

    <!-- ==================== 3. 함수 레퍼런스 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">함수 레퍼런스</h3>

      <div v-for="group in funcGroups" :key="group.title" class="func-group">
        <h4 class="func-group-title">{{ group.icon }} {{ group.title }}</h4>
        <div class="demo-box" style="padding: 0; overflow: hidden">
          <table class="ref-table">
            <thead>
              <tr>
                <th>함수</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fn in group.fns" :key="fn.name">
                <td>
                  <code class="fn-name">{{ fn.name }}</code>
                </td>
                <td class="fn-desc">{{ fn.desc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ==================== 4. 실전 패턴 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">실전 패턴</h3>
      <div class="code-explanation">
        <h4>파일 업로드 전 검증</h4>
        <pre><code>import { validateFileSize, validateFileExtension, formatFileSize } from '@/utils/fileHelper';

const handleFileSelect = (file: File) => {
  if (!validateFileSize(file, 10)) {
    alert(`파일 크기 초과: ${formatFileSize(file.size)} (최대 10MB)`);
    return;
  }
  if (!validateFileExtension(file, ['jpg', 'png', 'pdf'])) {
    alert('jpg, png, pdf 파일만 업로드 가능합니다.');
    return;
  }
  // 업로드 진행...
};</code></pre>

        <h4>파일 목록 UI에서 활용</h4>
        <pre><code>import { getFileIcon, formatFileSize, isImageFile } from '@/utils/fileHelper';

// 파일 목록 렌더링
files.value.forEach(file => {
  const icon = getFileIcon(file.name);          // 'fa-file-pdf', 'fa-file-image' ...
  const size = formatFileSize(file.size);        // '1.5 MB'
  const isImg = isImageFile(file.name);          // true/false → 썸네일 표시 여부
});</code></pre>

        <h4>이미지 리사이즈 후 다운로드</h4>
        <pre><code>import { resizeImage, downloadFile, blobToFile } from '@/utils/fileHelper';

const handleOptimize = async (file: File) => {
  // 800x800 이하로 리사이즈
  const blob = await resizeImage(file, 800, 800, 0.85);
  const optimized = blobToFile(blob, `optimized_${file.name}`);

  // 바로 다운로드
  downloadFile(optimized, optimized.name);
};</code></pre>

        <h4>Base64 변환 (미리보기 / API 전송)</h4>
        <pre><code>import { fileToBase64, base64ToBlob } from '@/utils/fileHelper';

// File → Base64 (미리보기, API 전송)
const base64 = await fileToBase64(file);
// 'data:image/jpeg;base64,/9j/4AAQ...'

// Base64 → Blob → File (역변환)
const blob = base64ToBlob(base64, 'image/jpeg');
const restoredFile = blobToFile(blob, 'restored.jpg');</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// ── formatFileSize 데모 ────────────────────────────────────────────
const sizeInput = ref(1536000);
const sizeExamples = [
  { bytes: 0, label: "0" },
  { bytes: 512, label: "512 B" },
  { bytes: 1024, label: "1 KB" },
  { bytes: 1536000, label: "1.5 MB" },
  { bytes: 104857600, label: "100 MB" },
  { bytes: 1073741824, label: "1 GB" },
];
const formatSize = (bytes: number, dec = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    dm = Math.max(0, dec),
    sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

// ── 파일명 처리 데모 ───────────────────────────────────────────────
const filenameInput = ref("report (2025).PDF");

const getExt = (name: string) => {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i + 1).toLowerCase();
};
const getNameNoExt = (name: string) => {
  const i = name.lastIndexOf(".");
  return i === -1 ? name : name.slice(0, i);
};
const getMime = (name: string) => {
  const ext = getExt(name);
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    mp4: "video/mp4",
    mp3: "audio/mpeg",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    zip: "application/zip",
    txt: "text/plain",
    csv: "text/csv",
    json: "application/json",
  };
  return map[ext] || "application/octet-stream";
};
const getIcon = (name: string) => {
  const ext = getExt(name);
  if (["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(ext))
    return "fa-file-image";
  if (["mp4", "avi", "mov", "wmv", "mkv"].includes(ext)) return "fa-file-video";
  if (["mp3", "wav", "ogg", "aac"].includes(ext)) return "fa-file-audio";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "fa-file-archive";
  const m: Record<string, string> = {
    pdf: "fa-file-pdf",
    doc: "fa-file-word",
    docx: "fa-file-word",
    xls: "fa-file-excel",
    xlsx: "fa-file-excel",
    ppt: "fa-file-powerpoint",
    pptx: "fa-file-powerpoint",
    txt: "fa-file-alt",
    csv: "fa-file-csv",
    json: "fa-file-code",
  };
  return m[ext] || "fa-file";
};
const sanitize = (name: string) => {
  const ext = getExt(name),
    base = getNameNoExt(name);
  const s = base
    .replace(/[^\w\s가-힣-]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "");
  return ext ? `${s}.${ext}` : s;
};
const isImage = (n: string) =>
  ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "ico"].includes(
    getExt(n),
  );
const isVideo = (n: string) =>
  ["mp4", "avi", "mov", "wmv", "flv", "mkv", "webm"].includes(getExt(n));
const isAudio = (n: string) =>
  ["mp3", "wav", "ogg", "flac", "aac", "m4a", "wma"].includes(getExt(n));
const isDoc = (n: string) =>
  [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "rtf",
    "odt",
    "ods",
    "odp",
  ].includes(getExt(n));
const isArchive = (n: string) =>
  ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"].includes(getExt(n));

// ── 함수 레퍼런스 ─────────────────────────────────────────────────
const funcGroups = [
  {
    title: "파일 정보 추출",
    icon: "📋",
    fns: [
      {
        name: "formatFileSize(bytes, decimals?)",
        desc: "바이트를 읽기 쉬운 크기로 변환 (Bytes/KB/MB/GB)",
      },
      {
        name: "getFileExtension(filename)",
        desc: "확장자 소문자로 추출 (점 제외)",
      },
      {
        name: "getFileNameWithoutExtension(filename)",
        desc: "확장자 제외 파일명 추출",
      },
      { name: "getMimeType(filename)", desc: "파일명 기반 MIME 타입 반환" },
      {
        name: "getFileIcon(filename)",
        desc: "Font Awesome 아이콘 클래스명 반환 (fa-file-pdf 등)",
      },
      {
        name: "sanitizeFilename(filename)",
        desc: "특수문자를 언더스코어로 치환하여 안전한 파일명으로 변환",
      },
      {
        name: "getTotalFileSize(files[])",
        desc: "File 배열의 총 크기(bytes) 합산",
      },
    ],
  },
  {
    title: "파일 타입 판별",
    icon: "🔍",
    fns: [
      {
        name: "isImageFile(filename)",
        desc: "jpg, jpeg, png, gif, bmp, webp, svg, ico",
      },
      {
        name: "isVideoFile(filename)",
        desc: "mp4, avi, mov, wmv, flv, mkv, webm",
      },
      {
        name: "isAudioFile(filename)",
        desc: "mp3, wav, ogg, flac, aac, m4a, wma",
      },
      {
        name: "isDocumentFile(filename)",
        desc: "pdf, doc/docx, xls/xlsx, ppt/pptx, txt, rtf, odt 등",
      },
      {
        name: "isArchiveFile(filename)",
        desc: "zip, rar, 7z, tar, gz, bz2, xz",
      },
    ],
  },
  {
    title: "파일 변환",
    icon: "🔄",
    fns: [
      {
        name: "fileToBase64(file)",
        desc: "File → Base64 Data URL Promise (미리보기, API 전송)",
      },
      { name: "base64ToBlob(base64, mimeType?)", desc: "Base64 → Blob 변환" },
      { name: "blobToFile(blob, filename)", desc: "Blob → File 변환" },
      {
        name: "readFileAsText(file)",
        desc: "File 내용을 텍스트 문자열로 읽기 Promise",
      },
      {
        name: "readFileAsArrayBuffer(file)",
        desc: "File 내용을 ArrayBuffer로 읽기 Promise",
      },
    ],
  },
  {
    title: "이미지 처리",
    icon: "🖼️",
    fns: [
      {
        name: "createImagePreview(file)",
        desc: "이미지 파일 → Base64 미리보기 URL Promise. 이미지가 아닌 파일은 reject",
      },
      {
        name: "resizeImage(file, maxW, maxH, quality?)",
        desc: "비율 유지하며 이미지 리사이즈 → Blob Promise. quality 기본 0.9",
      },
    ],
  },
  {
    title: "다운로드",
    icon: "📥",
    fns: [
      {
        name: "downloadFile(blob, filename)",
        desc: "Blob/File을 브라우저 다운로드로 저장 (a 태그 클릭 방식)",
      },
      {
        name: "downloadFileFromUrl(url, filename)",
        desc: "URL fetch 후 다운로드. axiosConfig의 downloadFile과 역할 유사하나 fetch 기반",
      },
    ],
  },
  {
    title: "검증",
    icon: "✅",
    fns: [
      {
        name: "validateFileSize(file, maxMB)",
        desc: "MB 단위 최대 크기 검증 (true/false)",
      },
      {
        name: "validateFileExtension(file, extensions[])",
        desc: "허용 확장자 목록으로 검증 (대소문자 무시)",
      },
    ],
  },
];
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

// 파일 크기 데모
.size-demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: $spacing-md;
}
.ctrl-label {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  white-space: nowrap;
}
.size-input {
  padding: 7px 10px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  width: 160px;
}
.size-result {
  font-size: $font-size-base;
  color: $color-text-secondary;
  strong {
    color: $color-primary;
    font-family: monospace;
    font-size: $font-size-lg;
  }
}
.size-examples {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.size-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 16px;
  background: $color-bg-light;
  border: 1px solid $color-border;
  border-radius: $radius-md;
  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    border-color: $color-primary;
    background: white;
  }
  .chip-bytes {
    font-size: $font-size-xs;
    color: $color-text-light;
  }
  .chip-result {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    font-family: monospace;
  }
}

// 파일명 데모
.filename-demo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: $spacing-md;
}
.filename-results {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.fname-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 10px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  code {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 2px 7px;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-family: monospace;
    white-space: nowrap;
  }
  .arrow {
    color: $color-text-light;
    flex-shrink: 0;
  }
  strong {
    color: $color-text-primary;
    font-family: monospace;
  }
}
.type-badges {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  padding: 8px 10px;
  background: $color-bg-light;
  border-radius: $radius-sm;
}
.type-badge {
  padding: 3px 10px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  font-family: monospace;
}
.badge-on {
  background: #dcfce7;
  color: #15803d;
}
.badge-off {
  background: $color-bg-gray;
  color: $color-text-light;
}

// 함수 레퍼런스
.func-group {
  margin-bottom: $spacing-xl;
}
.func-group-title {
  font-size: $font-size-base;
  font-weight: $font-weight-semibold;
  color: $color-text-primary;
  margin-bottom: $spacing-sm;
}
.ref-table {
  width: 100%;
  border-collapse: collapse;
  th {
    padding: 9px 12px;
    background: $color-bg-light;
    font-size: $font-size-xs;
    font-weight: $font-weight-semibold;
    color: $color-text-secondary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: left;
    border-bottom: 1px solid $color-border-light;
  }
  td {
    padding: 9px 12px;
    border-bottom: 1px solid $color-border-light;
    vertical-align: middle;
    font-size: $font-size-sm;
  }
  tr:last-child td {
    border-bottom: none;
  }
  .fn-name {
    background: #eff6ff;
    color: #1d4ed8;
    padding: 2px 7px;
    border-radius: $radius-sm;
    font-size: $font-size-xs;
    font-family: monospace;
    white-space: nowrap;
  }
  .fn-desc {
    color: $color-text-secondary;
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
</style>
