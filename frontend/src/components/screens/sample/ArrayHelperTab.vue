<template>
  <div>
    <h2 class="section-title">arrayHelper</h2>
    <p class="section-desc">
      Lodash를 기반으로 한 배열 조작 유틸리티입니다. 모든 함수는 원본 배열을
      변경하지 않고 새 배열을 반환합니다.
    </p>

    <!-- ==================== 1. 인터랙티브 데모 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">Live Demo</h3>

      <div class="demo-box">
        <div class="demo-tabs">
          <button
            v-for="t in demoTabs"
            :key="t.id"
            class="demo-tab"
            :class="{ active: activeTab === t.id }"
            @click="activeTab = t.id"
          >
            {{ t.label }}
          </button>
        </div>

        <!-- groupBy -->
        <div v-if="activeTab === 'groupBy'" class="demo-panel">
          <p class="demo-desc">
            <code>groupBy(array, key)</code> — 특정 키 기준으로 그룹화
          </p>
          <div class="demo-split">
            <div class="demo-input-area">
              <p class="area-label">원본 데이터</p>
              <div class="data-list">
                <div v-for="u in sampleUsers" :key="u.id" class="data-row">
                  <span class="tag" :class="`tag-${u.role}`">{{ u.role }}</span>
                  <span>{{ u.name }}</span>
                </div>
              </div>
              <div class="demo-control">
                <label>groupBy 기준:</label>
                <select v-model="groupByKey" class="demo-select">
                  <option value="role">role</option>
                  <option value="dept">dept</option>
                </select>
              </div>
            </div>
            <div class="demo-output-area">
              <p class="area-label">결과</p>
              <div
                v-for="(items, key) in groupedResult"
                :key="key"
                class="group-block"
              >
                <span class="group-key">{{ key }}</span>
                <span class="group-items">{{
                  items.map((u: any) => u.name).join(", ")
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- chunk -->
        <div v-if="activeTab === 'chunk'" class="demo-panel">
          <p class="demo-desc">
            <code>chunk(array, size)</code> — 배열을 특정 크기로 분할
          </p>
          <div class="demo-split">
            <div class="demo-input-area">
              <p class="area-label">원본</p>
              <div class="number-list">
                <span v-for="n in sampleNumbers" :key="n" class="num-tag">{{
                  n
                }}</span>
              </div>
              <div class="demo-control">
                <label>chunk size:</label>
                <input
                  v-model.number="chunkSize"
                  type="range"
                  min="1"
                  max="5"
                  class="demo-range"
                />
                <span class="range-val">{{ chunkSize }}</span>
              </div>
            </div>
            <div class="demo-output-area">
              <p class="area-label">결과 ({{ chunkedResult.length }}개 청크)</p>
              <div
                v-for="(chunk, i) in chunkedResult"
                :key="i"
                class="chunk-row"
              >
                <span class="chunk-idx">[{{ i }}]</span>
                <span v-for="n in chunk" :key="n" class="num-tag">{{ n }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- sortBy -->
        <div v-if="activeTab === 'sortBy'" class="demo-panel">
          <p class="demo-desc">
            <code>sortBy(array, key, order)</code> — 특정 키로 정렬
          </p>
          <div class="demo-split">
            <div class="demo-input-area">
              <div
                class="demo-control"
                style="gap: 8px; flex-direction: row; align-items: center"
              >
                <label>정렬 기준:</label>
                <select v-model="sortByKey" class="demo-select">
                  <option value="name">name</option>
                  <option value="score">score</option>
                  <option value="age">age</option>
                </select>
                <select v-model="sortByOrder" class="demo-select">
                  <option value="asc">asc ▲</option>
                  <option value="desc">desc ▼</option>
                </select>
              </div>
            </div>
            <div class="demo-output-area" style="flex: 2">
              <table class="mini-table">
                <thead>
                  <tr>
                    <th>name</th>
                    <th>score</th>
                    <th>age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="u in sortedResult" :key="u.name">
                    <td>{{ u.name }}</td>
                    <td>{{ u.score }}</td>
                    <td>{{ u.age }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- partition -->
        <div v-if="activeTab === 'partition'" class="demo-panel">
          <p class="demo-desc">
            <code>partition(array, predicate)</code> — 조건 기준으로 두 배열로
            분리
          </p>
          <div class="demo-split">
            <div class="demo-input-area">
              <p class="area-label">원본 점수</p>
              <div class="number-list" style="flex-wrap: wrap; gap: 4px">
                <span
                  v-for="s in sampleScores"
                  :key="s"
                  class="num-tag"
                  :class="s >= partitionThreshold ? 'num-pass' : 'num-fail'"
                  >{{ s }}</span
                >
              </div>
              <div class="demo-control">
                <label>기준 점수 ≥</label>
                <input
                  v-model.number="partitionThreshold"
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  class="demo-range"
                />
                <span class="range-val">{{ partitionThreshold }}</span>
              </div>
            </div>
            <div class="demo-output-area">
              <p class="area-label" style="color: #16a34a">
                ✅ 통과 ({{ partitionResult[0].length }}개)
              </p>
              <div class="number-list">
                <span
                  v-for="s in partitionResult[0]"
                  :key="s"
                  class="num-tag num-pass"
                  >{{ s }}</span
                >
              </div>
              <p class="area-label" style="color: #dc2626; margin-top: 12px">
                ❌ 미통과 ({{ partitionResult[1].length }}개)
              </p>
              <div class="number-list">
                <span
                  v-for="s in partitionResult[1]"
                  :key="s"
                  class="num-tag num-fail"
                  >{{ s }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-explanation">
        <pre><code>import { groupBy, chunk, sortBy, sortByMultiple, partition, extractUniqueValues } from '@/utils/arrayHelper';

// groupBy — 역할별로 그룹화
const byRole = groupBy(users, 'role');
// { '학생': [...], '강사': [...] }

// chunk — 3개씩 분할
const pages = chunk(items, 3);
// [[item1, item2, item3], [item4, item5, item6], ...]

// sortBy — 단일 키 정렬
const sorted = sortBy(users, 'name', 'asc');

// sortByMultiple — 다중 키 정렬 (이름 오름차순, 점수 내림차순)
const multiSorted = sortByMultiple(users, ['name', 'score'], ['asc', 'desc']);

// partition — 합격/불합격 분리
const [passed, failed] = partition(scores, (s) => s >= 60);

// extractUniqueValues — 특정 필드 유니크 값 추출
const roles = extractUniqueValues(users, 'role');
// ['학생', '강사', '관리자']</code></pre>
      </div>
    </section>

    <!-- ==================== 2. 함수 레퍼런스 ==================== -->
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
                <th>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="fn in group.fns" :key="fn.name">
                <td>
                  <code class="fn-name">{{ fn.name }}</code>
                </td>
                <td class="fn-desc">{{ fn.desc }}</td>
                <td>
                  <code class="fn-example">{{ fn.example }}</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ==================== 3. 실전 패턴 ==================== -->
    <section class="style-section">
      <h3 class="subsection-title">실전 패턴</h3>
      <div class="code-explanation">
        <h4>API 데이터 가공 패턴</h4>
        <pre><code>import { groupBy, sortBy, pluck, toMap, sumBy, maxBy } from '@/utils/arrayHelper';

// 수강생 목록을 강의실별로 그룹화 후 이름순 정렬
const grouped = groupBy(students, 'classroom');
const sortedGrouped = Object.fromEntries(
  Object.entries(grouped).map(([k, v]) => [k, sortBy(v, 'name')])
);

// ID 배열 추출 (삭제 요청 등에 활용)
const ids = pluck(selectedRows, 'id');  // [1, 3, 7, 12]

// ID → 객체 맵 변환 (빠른 조회)
const userMap = toMap(users, 'id');     // { '1': {...}, '3': {...} }
const user = userMap[targetId];

// 통계 계산
const totalScore = sumBy(submissions, 'score');
const topStudent = maxBy(students, 'score');</code></pre>

        <h4>필터링 체이닝 패턴</h4>
        <pre><code>import { filter, sortBy, take, pluck } from '@/utils/arrayHelper';

// 활성화된 학생 중 점수 상위 5명의 ID 추출
const top5Ids = pluck(
  take(
    sortBy(
      filter(students, { isActive: true }),
      'score', 'desc'
    ),
    5
  ),
  'id'
);</code></pre>

        <h4>집합 연산 활용</h4>
        <pre><code>import { intersection, difference, union } from '@/utils/arrayHelper';

const attendedA = [1, 2, 3, 4, 5];    // A강의 수강생 ID
const attendedB = [3, 4, 5, 6, 7];    // B강의 수강생 ID

const both    = intersection(attendedA, attendedB);  // [3, 4, 5] — 공통 수강생
const onlyA   = difference(attendedA, attendedB);    // [1, 2]    — A만 수강
const allUniq = union(attendedA, attendedB);         // [1,2,3,4,5,6,7]</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// ── 데모 데이터 ────────────────────────────────────────────────────
const sampleUsers = ref([
  { id: 1, name: "김철수", role: "학생", dept: "개발", score: 85, age: 22 },
  { id: 2, name: "이영희", role: "강사", dept: "기획", score: 92, age: 35 },
  { id: 3, name: "박민준", role: "학생", dept: "개발", score: 67, age: 24 },
  { id: 4, name: "최지우", role: "관리자", dept: "인사", score: 98, age: 42 },
  { id: 5, name: "정하준", role: "학생", dept: "기획", score: 73, age: 21 },
  { id: 6, name: "강서연", role: "강사", dept: "개발", score: 88, age: 31 },
]);
const sampleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sampleScores = [42, 78, 91, 55, 63, 85, 29, 70, 96, 48, 61, 82];

const activeTab = ref("groupBy");
const demoTabs = [
  { id: "groupBy", label: "groupBy" },
  { id: "chunk", label: "chunk" },
  { id: "sortBy", label: "sortBy" },
  { id: "partition", label: "partition" },
];

// groupBy
const groupByKey = ref<"role" | "dept">("role");
const groupedResult = computed(() => {
  const result: Record<string, typeof sampleUsers.value> = {};
  sampleUsers.value.forEach((u) => {
    const key = u[groupByKey.value];
    if (!result[key]) result[key] = [];
    result[key].push(u);
  });
  return result;
});

// chunk
const chunkSize = ref(3);
const chunkedResult = computed(() => {
  const arr = sampleNumbers;
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize.value) {
    result.push(arr.slice(i, i + chunkSize.value));
  }
  return result;
});

// sortBy
const sortByKey = ref<"name" | "score" | "age">("score");
const sortByOrder = ref<"asc" | "desc">("desc");
const sortedResult = computed(() => {
  return [...sampleUsers.value].sort((a, b) => {
    const av = a[sortByKey.value],
      bv = b[sortByKey.value];
    const cmp =
      typeof av === "number" && typeof bv === "number"
        ? av - bv
        : String(av).localeCompare(String(bv), "ko-KR");
    return sortByOrder.value === "asc" ? cmp : -cmp;
  });
});

// partition
const partitionThreshold = ref(70);
const partitionResult = computed((): [number[], number[]] => {
  const pass: number[] = [],
    fail: number[] = [];
  sampleScores.forEach((s) =>
    s >= partitionThreshold.value ? pass.push(s) : fail.push(s),
  );
  return [pass, fail];
});

// ── 함수 레퍼런스 그룹 ──────────────────────────────────────────────
const funcGroups = [
  {
    title: "변환 / 그룹화",
    icon: "🔄",
    fns: [
      {
        name: "groupBy(arr, key)",
        desc: "키 기준으로 그룹화하여 객체 반환",
        example: "groupBy(users, 'role') → { 학생: [...], 강사: [...] }",
      },
      {
        name: "chunk(arr, size)",
        desc: "배열을 size 크기의 청크로 분할",
        example: "chunk([1..10], 3) → [[1,2,3],[4,5,6],...]",
      },
      {
        name: "toMap(arr, key)",
        desc: "키 필드를 인덱스로 하는 객체로 변환",
        example: "toMap(users, 'id') → { '1': {...} }",
      },
      {
        name: "pluck(arr, key)",
        desc: "특정 필드 값만 추출한 배열 반환",
        example: "pluck(users, 'id') → [1, 2, 3]",
      },
      {
        name: "extractUniqueValues(arr, key)",
        desc: "특정 필드의 중복 없는 값 목록",
        example: "extractUniqueValues(users, 'role') → ['학생','강사']",
      },
      {
        name: "flatten(arr)",
        desc: "1단계 중첩 배열 평탄화",
        example: "flatten([[1,2],[3,4]]) → [1,2,3,4]",
      },
      {
        name: "flattenDeep(arr)",
        desc: "모든 중첩 깊이 평탄화",
        example: "flattenDeep([[1,[2,[3]]]]) → [1,2,3]",
      },
    ],
  },
  {
    title: "정렬",
    icon: "↕️",
    fns: [
      {
        name: "sortBy(arr, key, 'asc'|'desc')",
        desc: "단일 키 기준 정렬",
        example: "sortBy(users, 'score', 'desc')",
      },
      {
        name: "sortByMultiple(arr, keys, orders)",
        desc: "다중 키 정렬",
        example: "sortByMultiple(users, ['name','score'], ['asc','desc'])",
      },
      {
        name: "reverse(arr)",
        desc: "배열 역순 (원본 불변)",
        example: "reverse([1,2,3]) → [3,2,1]",
      },
    ],
  },
  {
    title: "검색 / 필터",
    icon: "🔍",
    fns: [
      {
        name: "filter(arr, fn|obj)",
        desc: "조건 함수 또는 객체로 필터링",
        example: "filter(users, { isActive: true })",
      },
      {
        name: "findByKey(arr, key, val)",
        desc: "특정 키-값으로 항목 찾기 (첫 번째)",
        example: "findByKey(users, 'id', 5)",
      },
      {
        name: "findIndex(arr, fn|obj)",
        desc: "조건을 만족하는 첫 인덱스 반환",
        example: "findIndex(users, { id: 3 }) → 2",
      },
      {
        name: "every(arr, fn)",
        desc: "모든 항목이 조건 만족 시 true",
        example: "every([2,4,6], x => x % 2 === 0) → true",
      },
      {
        name: "some(arr, fn)",
        desc: "하나라도 조건 만족 시 true",
        example: "some([1,2,3], x => x > 2) → true",
      },
    ],
  },
  {
    title: "집계 / 통계",
    icon: "📊",
    fns: [
      {
        name: "sum(arr)",
        desc: "숫자 배열 합계",
        example: "sum([1,2,3,4,5]) → 15",
      },
      {
        name: "average(arr)",
        desc: "숫자 배열 평균",
        example: "average([1,2,3,4,5]) → 3",
      },
      {
        name: "max(arr) / min(arr)",
        desc: "최대/최소값",
        example: "max([1,9,3]) → 9",
      },
      {
        name: "sumBy(arr, key)",
        desc: "특정 필드 합계",
        example: "sumBy(items, 'price') → 600",
      },
      {
        name: "maxBy(arr, key) / minBy(arr, key)",
        desc: "특정 필드 기준 최대/최솟값 항목",
        example: "maxBy(students, 'score') → {name:'최지우',...}",
      },
      {
        name: "count(arr)",
        desc: "배열 길이 (_.size)",
        example: "count([1,2,3]) → 3",
      },
    ],
  },
  {
    title: "배열 조작",
    icon: "✂️",
    fns: [
      {
        name: "unique(arr)",
        desc: "중복 제거",
        example: "unique([1,2,2,3]) → [1,2,3]",
      },
      {
        name: "uniqueBy(arr, key)",
        desc: "특정 키 기준 중복 제거",
        example: "uniqueBy(users, 'id')",
      },
      {
        name: "removeAt(arr, i)",
        desc: "인덱스 위치 항목 제거 (새 배열)",
        example: "removeAt([1,2,3,4], 1) → [1,3,4]",
      },
      {
        name: "insertAt(arr, i, item)",
        desc: "인덱스 위치에 항목 삽입",
        example: "insertAt([1,2,4], 2, 3) → [1,2,3,4]",
      },
      {
        name: "without(arr, ...vals)",
        desc: "특정 값들 모두 제거",
        example: "without([1,2,2,3], 2) → [1,3]",
      },
      {
        name: "compact(arr)",
        desc: "null/undefined 제거",
        example: "compact([1,null,2,undefined]) → [1,2]",
      },
      {
        name: "compactAll(arr)",
        desc: 'falsy 값 전체 제거 (0, false, "" 포함)',
        example: "compactAll([1,0,'',2]) → [1,2]",
      },
      {
        name: "partition(arr, fn)",
        desc: "조건 기준 두 배열로 분리",
        example: "partition(scores, s => s >= 60) → [[합격...],[불합격...]]",
      },
    ],
  },
  {
    title: "슬라이싱 / 선택",
    icon: "🎯",
    fns: [
      {
        name: "take(arr, n)",
        desc: "앞에서 n개 반환",
        example: "take([1,2,3,4,5], 3) → [1,2,3]",
      },
      {
        name: "skip(arr, n)",
        desc: "앞에서 n개 건너뛰고 반환",
        example: "skip([1,2,3,4,5], 2) → [3,4,5]",
      },
      {
        name: "first(arr) / last(arr)",
        desc: "첫/마지막 항목",
        example: "first([1,2,3]) → 1",
      },
      {
        name: "paginate(arr, page, size)",
        desc: "배열을 페이지 단위로 슬라이스 (1-based)",
        example: "paginate([1..10], 2, 3) → [4,5,6]",
      },
      {
        name: "sample(arr)",
        desc: "무작위 1개 선택",
        example: "sample([1,2,3,4,5]) → 3 (무작위)",
      },
      {
        name: "sampleSize(arr, n)",
        desc: "무작위 n개 선택",
        example: "sampleSize([1,2,3,4,5], 2) → [3,1]",
      },
      {
        name: "shuffle(arr)",
        desc: "무작위 순서로 섞기",
        example: "shuffle([1,2,3,4,5]) → [3,1,5,2,4]",
      },
    ],
  },
  {
    title: "집합 연산",
    icon: "∩",
    fns: [
      {
        name: "intersection(a, b)",
        desc: "교집합 (양쪽에 모두 있는 값)",
        example: "intersection([1,2,3],[2,3,4]) → [2,3]",
      },
      {
        name: "difference(a, b)",
        desc: "차집합 (a에만 있는 값)",
        example: "difference([1,2,3],[2,3,4]) → [1]",
      },
      {
        name: "union(a, b)",
        desc: "합집합 (중복 제거)",
        example: "union([1,2,3],[2,3,4]) → [1,2,3,4]",
      },
    ],
  },
  {
    title: "기타",
    icon: "🔧",
    fns: [
      {
        name: "isEmpty(arr) / isNotEmpty(arr)",
        desc: "배열 비어있는지 여부",
        example: "isEmpty([]) → true",
      },
      {
        name: "join(arr, sep)",
        desc: "구분자로 연결하여 문자열 변환",
        example: "join(['A','B','C'], '-') → 'A-B-C'",
      },
      {
        name: "map(arr, fn)",
        desc: "각 항목 변환 (_.map 래퍼)",
        example: "map([1,2,3], x => x*2) → [2,4,6]",
      },
      {
        name: "reduce(arr, fn, init)",
        desc: "누산 (_.reduce 래퍼)",
        example: "reduce([1,2,3,4], (sum,n) => sum+n, 0) → 10",
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

// 데모 탭
.demo-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: $spacing-lg;
  border-bottom: 2px solid $color-border-light;
  padding-bottom: -1px;
}
.demo-tab {
  padding: 7px 16px;
  border: none;
  border-radius: $radius-sm $radius-sm 0 0;
  background: $color-bg-light;
  color: $color-text-secondary;
  font-size: $font-size-sm;
  cursor: pointer;
  transition: all 0.15s;
  font-weight: $font-weight-medium;
  &:hover {
    background: white;
    color: $color-primary;
  }
  &.active {
    background: white;
    color: $color-primary;
    border: 1px solid $color-border-light;
    border-bottom: 2px solid white;
    font-weight: $font-weight-semibold;
  }
}
.demo-panel {
}
.demo-desc {
  font-size: $font-size-sm;
  color: $color-text-secondary;
  margin-bottom: $spacing-md;
  code {
    background: #e3f2fd;
    color: #1565c0;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
  }
}
.demo-split {
  display: flex;
  gap: $spacing-xl;
}
.demo-input-area,
.demo-output-area {
  flex: 1;
}
.area-label {
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
  color: $color-text-light;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}
.demo-control {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  label {
    font-size: $font-size-xs;
    color: $color-text-secondary;
  }
}
.demo-select {
  padding: 5px 8px;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  font-size: $font-size-sm;
  background: white;
}
.demo-range {
  width: 100%;
}
.range-val {
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
  color: $color-primary;
}

// 데이터 표시
.data-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.data-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: $font-size-sm;
  color: $color-text-primary;
}
.tag {
  padding: 2px 8px;
  border-radius: $radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-semibold;
}
.tag-학생 {
  background: #eff6ff;
  color: #1d4ed8;
}
.tag-강사 {
  background: #f0fdf4;
  color: #15803d;
}
.tag-관리자 {
  background: #fef3c7;
  color: #92400e;
}

.number-list {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}
.num-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: $radius-sm;
  background: $color-bg-light;
  border: 1px solid $color-border;
  font-size: $font-size-sm;
  font-weight: $font-weight-semibold;
}
.num-pass {
  background: #dcfce7;
  border-color: #86efac;
  color: #15803d;
}
.num-fail {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}

.chunk-row {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 4px;
}
.chunk-idx {
  font-size: $font-size-xs;
  color: $color-text-light;
  font-family: monospace;
  min-width: 28px;
}

.group-block {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: $color-bg-light;
  border-radius: $radius-sm;
  margin-bottom: 4px;
  font-size: $font-size-sm;
}
.group-key {
  font-weight: $font-weight-semibold;
  color: $color-primary;
  min-width: 60px;
  flex-shrink: 0;
}
.group-items {
  color: $color-text-secondary;
}

.mini-table {
  width: 100%;
  border-collapse: collapse;
  font-size: $font-size-sm;
  th,
  td {
    padding: 6px 10px;
    border-bottom: 1px solid $color-border-light;
    text-align: left;
  }
  th {
    background: $color-bg-light;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }
  td {
    color: $color-text-secondary;
  }
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
  .fn-example {
    background: $color-bg-light;
    color: $color-text-primary;
    padding: 2px 7px;
    border-radius: $radius-sm;
    font-size: 11px;
    font-family: monospace;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 280px;
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
