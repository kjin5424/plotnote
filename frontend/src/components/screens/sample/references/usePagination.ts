import { PAGINATION } from "@/constants/PAGINATION";
import { ref, computed, watch, type Ref } from "vue";

export function usePagination<T>(
  sourceData: Ref<T[]>, // 원본 전체 리스트
  options = { itemsPerPage: PAGINATION.DEFAULT_SIZE },
) {
  const currentPage = ref(1);
  const searchParams = ref({
    type: "all",
    keyword: "",
  }); // 검색어(searchType : "author", keyworkd : "관리자")
  const sortKey = ref(""); // 정렬 기준 (예: 'date', 'title')

  const filteredData = computed(() => {
    let data = [...sourceData.value];
    const { type, keyword } = searchParams.value;
    const lowerKeyword = keyword.toLowerCase().trim();
    // 검색에서 뺄 키값
    const excludeKeys = ["id", "img", "file", "file_id"];

    // 검색어
    if (searchParams.value) {
      data = data.filter((item: any) => {
        // 모든 필드를 검사
        if (type === "all") {
          return Object.entries(item).some(([key, value]) => {
            if (excludeKeys.includes(key)) return false; // 제외 리스트에 있으면 통과
            return String(value).toLowerCase().includes(lowerKeyword);
          });
        }
        // 특정 필드만 검사
        return item[type]?.toLowerCase().includes(lowerKeyword);
      });
    }

    // 정렬
    if (sortKey.value) {
      data.sort((a: any, b: any) =>
        a[sortKey.value] > b[sortKey.value] ? 1 : -1,
      );
    }

    return data;
  });

  // [단계 3] 페이징 로직 (필터링된 결과에서 자르기)
  const totalItems = computed(() => filteredData.value.length);

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * options.itemsPerPage;
    const end = start + options.itemsPerPage;
    return filteredData.value.slice(start, end);
  });

  const handlePageChange = (page: number) => {
    currentPage.value = page;
  };

  watch(
    searchParams,
    () => {
      currentPage.value = 1;
    },
    { deep: true },
  );

  return {
    currentPage,
    searchParams,
    sortKey,
    totalItems,
    paginatedData,
    handlePageChange,
  };
}
