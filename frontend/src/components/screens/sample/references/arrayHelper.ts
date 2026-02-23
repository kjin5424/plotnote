/**
 * 배열 조작 유틸리티 (Lodash 기반)
 * @module arrayHelper
 */

import _ from "lodash";

/**
 * 배열을 특정 크기의 청크로 분할
 * @param array - 분할할 배열
 * @param size - 청크 크기
 * @returns 분할된 배열의 배열
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
 */
export const chunk = <T>(array: T[], size: number): T[][] => {
  return _.chunk(array, size);
};

/**
 * 배열에서 중복 제거
 * @param array - 중복을 제거할 배열
 * @returns 중복이 제거된 배열
 * @example
 * unique([1, 2, 2, 3, 3, 3]) // [1, 2, 3]
 */
export const unique = <T>(array: T[]): T[] => {
  return _.uniq(array);
};

/**
 * 특정 속성 기준으로 배열에서 중복 제거
 * @param array - 중복을 제거할 객체 배열
 * @param key - 중복 체크 기준 키
 * @returns 중복이 제거된 배열
 * @example
 * uniqueBy([{id: 1, name: 'A'}, {id: 1, name: 'B'}], 'id') // [{id: 1, name: 'A'}]
 */
export const uniqueBy = <T>(array: T[], key: keyof T): T[] => {
  return _.uniqBy(array, key as string);
};

/**
 * 배열을 무작위로 섞음
 * @param array - 섞을 배열
 * @returns 섞인 새 배열
 * @example
 * shuffle([1, 2, 3, 4, 5]) // [3, 1, 5, 2, 4] (무작위)
 */
export const shuffle = <T>(array: T[]): T[] => {
  return _.shuffle(array);
};

/**
 * 배열을 특정 키로 그룹화
 * @param array - 그룹화할 배열
 * @param key - 그룹화 기준 키
 * @returns 그룹화된 객체
 * @example
 * groupBy([{type: 'A', val: 1}, {type: 'B', val: 2}, {type: 'A', val: 3}], 'type')
 * // {A: [{type: 'A', val: 1}, {type: 'A', val: 3}], B: [{type: 'B', val: 2}]}
 */
export const groupBy = <T>(array: T[], key: keyof T): Record<string, T[]> => {
  return _.groupBy(array, key as string);
};

/**
 * 배열의 합계 계산
 * @param array - 숫자 배열
 * @returns 합계
 * @example
 * sum([1, 2, 3, 4, 5]) // 15
 */
export const sum = (array: number[]): number => {
  return _.sum(array);
};

/**
 * 배열의 평균 계산
 * @param array - 숫자 배열
 * @returns 평균
 * @example
 * average([1, 2, 3, 4, 5]) // 3
 */
export const average = (array: number[]): number => {
  return _.mean(array);
};

/**
 * 배열의 최댓값 반환
 * @param array - 숫자 배열
 * @returns 최댓값
 * @example
 * max([1, 5, 3, 9, 2]) // 9
 */
export const max = (array: number[]): number | undefined => {
  return _.max(array);
};

/**
 * 배열의 최솟값 반환
 * @param array - 숫자 배열
 * @returns 최솟값
 * @example
 * min([1, 5, 3, 9, 2]) // 1
 */
export const min = (array: number[]): number | undefined => {
  return _.min(array);
};

/**
 * 배열을 특정 속성 기준으로 정렬
 * @param array - 정렬할 배열
 * @param key - 정렬 기준 키
 * @param order - 정렬 순서 ('asc' | 'desc')
 * @returns 정렬된 새 배열
 * @example
 * sortBy([{age: 30}, {age: 20}, {age: 25}], 'age', 'asc')
 * // [{age: 20}, {age: 25}, {age: 30}]
 */
export const sortBy = <T>(
  array: T[],
  key: keyof T,
  order: "asc" | "desc" = "asc",
): T[] => {
  return _.orderBy(array, [key as string], [order]);
};

/**
 * 배열을 여러 속성 기준으로 정렬
 * @param array - 정렬할 배열
 * @param keys - 정렬 기준 키 배열
 * @param orders - 정렬 순서 배열 ('asc' | 'desc')
 * @returns 정렬된 새 배열
 * @example
 * sortByMultiple([{name: 'A', age: 30}, {name: 'A', age: 20}], ['name', 'age'], ['asc', 'desc'])
 */
export const sortByMultiple = <T>(
  array: T[],
  keys: (keyof T)[],
  orders: ("asc" | "desc")[],
): T[] => {
  return _.orderBy(array, keys as string[], orders);
};

/**
 * 배열을 페이지네이션
 * @param array - 페이지네이션할 배열
 * @param page - 현재 페이지 (1부터 시작)
 * @param pageSize - 페이지당 항목 수
 * @returns 해당 페이지의 항목들
 * @example
 * paginate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 3) // [4, 5, 6]
 */
export const paginate = <T>(
  array: T[],
  page: number,
  pageSize: number,
): T[] => {
  const start = (page - 1) * pageSize;
  return _.slice(array, start, start + pageSize);
};

/**
 * 배열에서 특정 인덱스의 항목 제거
 * @param array - 배열
 * @param index - 제거할 인덱스
 * @returns 항목이 제거된 새 배열
 * @example
 * removeAt([1, 2, 3, 4, 5], 2) // [1, 2, 4, 5]
 */
export const removeAt = <T>(array: T[], index: number): T[] => {
  return [..._.slice(array, 0, index), ..._.slice(array, index + 1)];
};

/**
 * 배열의 특정 인덱스에 항목 삽입
 * @param array - 배열
 * @param index - 삽입할 인덱스
 * @param item - 삽입할 항목
 * @returns 항목이 삽입된 새 배열
 * @example
 * insertAt([1, 2, 4, 5], 2, 3) // [1, 2, 3, 4, 5]
 */
export const insertAt = <T>(array: T[], index: number, item: T): T[] => {
  const result = _.clone(array);
  result.splice(index, 0, item);
  return result;
};

/**
 * 배열의 첫 번째 항목 반환
 * @param array - 배열
 * @returns 첫 번째 항목 또는 undefined
 * @example
 * first([1, 2, 3]) // 1
 */
export const first = <T>(array: T[]): T | undefined => {
  return _.first(array);
};

/**
 * 배열의 마지막 항목 반환
 * @param array - 배열
 * @returns 마지막 항목 또는 undefined
 * @example
 * last([1, 2, 3]) // 3
 */
export const last = <T>(array: T[]): T | undefined => {
  return _.last(array);
};

/**
 * 배열이 비어있는지 확인
 * @param array - 확인할 배열
 * @returns 비어있으면 true
 * @example
 * isEmpty([]) // true
 * isEmpty([1, 2, 3]) // false
 */
export const isEmpty = <T>(array: T[]): boolean => {
  return _.isEmpty(array);
};

/**
 * 배열이 비어있지 않은지 확인
 * @param array - 확인할 배열
 * @returns 비어있지 않으면 true
 * @example
 * isNotEmpty([1, 2, 3]) // true
 * isNotEmpty([]) // false
 */
export const isNotEmpty = <T>(array: T[]): boolean => {
  return !_.isEmpty(array);
};

/**
 * 두 배열의 교집합 반환
 * @param array1 - 첫 번째 배열
 * @param array2 - 두 번째 배열
 * @returns 교집합 배열
 * @example
 * intersection([1, 2, 3], [2, 3, 4]) // [2, 3]
 */
export const intersection = <T>(array1: T[], array2: T[]): T[] => {
  return _.intersection(array1, array2);
};

/**
 * 두 배열의 차집합 반환 (array1 - array2)
 * @param array1 - 첫 번째 배열
 * @param array2 - 두 번째 배열
 * @returns 차집합 배열
 * @example
 * difference([1, 2, 3], [2, 3, 4]) // [1]
 */
export const difference = <T>(array1: T[], array2: T[]): T[] => {
  return _.difference(array1, array2);
};

/**
 * 두 배열의 합집합 반환
 * @param array1 - 첫 번째 배열
 * @param array2 - 두 번째 배열
 * @returns 합집합 배열 (중복 제거)
 * @example
 * union([1, 2, 3], [2, 3, 4]) // [1, 2, 3, 4]
 */
export const union = <T>(array1: T[], array2: T[]): T[] => {
  return _.union(array1, array2);
};

/**
 * 배열을 특정 개수로 분할하여 앞부분만 반환 (나머지는 무시)
 * @param array - 분할할 배열
 * @param count - 반환할 개수
 * @returns 앞부분 배열
 * @example
 * take([1, 2, 3, 4, 5], 3) // [1, 2, 3]
 */
export const take = <T>(array: T[], count: number): T[] => {
  return _.take(array, count);
};

/**
 * 배열에서 앞부분 특정 개수를 건너뛰고 나머지 반환
 * @param array - 배열
 * @param count - 건너뛸 개수
 * @returns 나머지 배열
 * @example
 * skip([1, 2, 3, 4, 5], 2) // [3, 4, 5]
 */
export const skip = <T>(array: T[], count: number): T[] => {
  return _.drop(array, count);
};

/**
 * 배열에서 조건을 만족하는 항목들만 추출
 * @param array - 배열
 * @param predicate - 조건 함수 또는 객체
 * @returns 조건을 만족하는 항목들
 * @example
 * filter([1, 2, 3, 4, 5], (x) => x > 2) // [3, 4, 5]
 * filter([{active: true}, {active: false}], {active: true}) // [{active: true}]
 */
export const filter = <T>(
  array: T[],
  predicate: ((item: T, index: number) => boolean) | Partial<T>,
): T[] => {
  return _.filter(array, predicate as any);
};

/**
 * 배열의 모든 항목이 조건을 만족하는지 확인
 * @param array - 배열
 * @param predicate - 조건 함수
 * @returns 모든 항목이 조건을 만족하면 true
 * @example
 * every([2, 4, 6], (x) => x % 2 === 0) // true
 */
export const every = <T>(
  array: T[],
  predicate: (item: T) => boolean,
): boolean => {
  return _.every(array, predicate);
};

/**
 * 배열의 일부 항목이 조건을 만족하는지 확인
 * @param array - 배열
 * @param predicate - 조건 함수
 * @returns 일부 항목이 조건을 만족하면 true
 * @example
 * some([1, 2, 3], (x) => x > 2) // true
 */
export const some = <T>(
  array: T[],
  predicate: (item: T) => boolean,
): boolean => {
  return _.some(array, predicate);
};

/**
 * 배열에서 특정 값을 가진 항목 찾기
 * @param array - 배열
 * @param key - 검색할 키
 * @param value - 검색할 값
 * @returns 찾은 항목 또는 undefined
 * @example
 * findByKey([{id: 1, name: 'A'}, {id: 2, name: 'B'}], 'id', 2)
 * // {id: 2, name: 'B'}
 */
export const findByKey = <T>(
  array: T[],
  key: keyof T,
  value: any,
): T | undefined => {
  return _.find(array, { [key]: value } as any);
};

/**
 * 배열을 평탄화 (1 depth)
 * @param array - 중첩 배열
 * @returns 평탄화된 배열
 * @example
 * flatten([[1, 2], [3, 4], [5]]) // [1, 2, 3, 4, 5]
 */
export const flatten = <T>(array: T[][]): T[] => {
  return _.flatten(array);
};

/**
 * 배열을 완전히 평탄화 (모든 depth)
 * @param array - 중첩 배열
 * @returns 완전히 평탄화된 배열
 * @example
 * flattenDeep([[1, [2, [3, [4]]]], 5]) // [1, 2, 3, 4, 5]
 */
export const flattenDeep = (array: any[]): any[] => {
  return _.flattenDeep(array);
};

/**
 * 배열의 개수 세기
 * @param array - 배열
 * @returns 배열의 길이
 * @example
 * count([1, 2, 3, 4, 5]) // 5
 */
export const count = <T>(array: T[]): number => {
  return _.size(array);
};

/**
 * 배열을 특정 속성값으로 매핑하여 객체로 변환
 * @param array - 배열
 * @param key - 키로 사용할 속성
 * @returns 객체 맵
 * @example
 * toMap([{id: 1, name: 'A'}, {id: 2, name: 'B'}], 'id')
 * // {1: {id: 1, name: 'A'}, 2: {id: 2, name: 'B'}}
 */
export const toMap = <T>(array: T[], key: keyof T): Record<string, T> => {
  return _.keyBy(array, key as string);
};

/**
 * 배열을 역순으로 반전
 * @param array - 배열
 * @returns 역순 배열
 * @example
 * reverse([1, 2, 3, 4, 5]) // [5, 4, 3, 2, 1]
 */
export const reverse = <T>(array: T[]): T[] => {
  return _.reverse([...array]);
};

/**
 * 배열에서 특정 조건을 만족하는 항목의 인덱스 찾기
 * @param array - 배열
 * @param predicate - 조건 함수 또는 객체
 * @returns 인덱스 또는 -1
 * @example
 * findIndex([{id: 1}, {id: 2}, {id: 3}], {id: 2}) // 1
 */
export const findIndex = <T>(
  array: T[],
  predicate: ((item: T) => boolean) | Partial<T>,
): number => {
  return _.findIndex(array, predicate as any);
};

/**
 * 배열에서 특정 값들을 제거
 * @param array - 배열
 * @param values - 제거할 값들
 * @returns 값들이 제거된 새 배열
 * @example
 * without([1, 2, 3, 2, 4, 2], 2) // [1, 3, 4]
 */
export const without = <T>(array: T[], ...values: T[]): T[] => {
  return _.without(array, ...values);
};

/**
 * 배열을 특정 조건으로 분할
 * @param array - 배열
 * @param predicate - 조건 함수
 * @returns [조건 만족 배열, 조건 불만족 배열]
 * @example
 * partition([1, 2, 3, 4, 5], (x) => x % 2 === 0) // [[2, 4], [1, 3, 5]]
 */
export const partition = <T>(
  array: T[],
  predicate: (item: T) => boolean,
): [T[], T[]] => {
  return _.partition(array, predicate);
};

/**
 * 배열에서 특정 속성값만 추출
 * @param array - 객체 배열
 * @param key - 추출할 속성 키
 * @returns 속성값 배열
 * @example
 * pluck([{id: 1, name: 'A'}, {id: 2, name: 'B'}], 'name') // ['A', 'B']
 */
export const pluck = <T, K extends keyof T>(array: T[], key: K): T[K][] => {
  return _.map(array, key as string) as T[K][];
};

/**
 * 배열을 특정 개수씩 묶어서 변환
 * @param array - 배열
 * @param iteratee - 변환 함수
 * @returns 변환된 배열
 * @example
 * map([1, 2, 3], (x) => x * 2) // [2, 4, 6]
 */
export const map = <T, U>(
  array: T[],
  iteratee: (item: T, index: number) => U,
): U[] => {
  return _.map(array, iteratee);
};

/**
 * 배열의 모든 요소를 하나의 값으로 축약
 * @param array - 배열
 * @param iteratee - 축약 함수
 * @param initialValue - 초기값
 * @returns 축약된 값
 * @example
 * reduce([1, 2, 3, 4], (sum, n) => sum + n, 0) // 10
 */
export const reduce = <T, U>(
  array: T[],
  iteratee: (accumulator: U, item: T, index: number) => U,
  initialValue: U,
): U => {
  return _.reduce(array, iteratee, initialValue);
};

/**
 * 배열을 특정 구분자로 연결하여 문자열로 변환
 * @param array - 배열
 * @param separator - 구분자 (기본값: ',')
 * @returns 연결된 문자열
 * @example
 * join(['A', 'B', 'C'], '-') // 'A-B-C'
 */
export const join = <T>(array: T[], separator: string = ","): string => {
  return _.join(array, separator);
};

/**
 * 배열에서 null과 undefined를 제거
 * @param array - 배열
 * @returns null, undefined가 제거된 배열
 * @example
 * compact([1, null, 2, undefined, 3, 0, false]) // [1, 2, 3, 0, false]
 */
export const compact = <T>(array: (T | null | undefined)[]): T[] => {
  return _.compact(array) as T[];
};

/**
 * 배열에서 falsy 값들을 모두 제거
 * @param array - 배열
 * @returns falsy가 제거된 배열
 * @example
 * compactAll([1, null, 2, undefined, 3, 0, false, '']) // [1, 2, 3]
 */
export const compactAll = <T>(array: T[]): T[] => {
  return _.filter(array, Boolean) as T[];
};

/**
 * 배열의 특정 속성 기준으로 최댓값을 가진 항목 반환
 * @param array - 배열
 * @param key - 비교할 속성 키
 * @returns 최댓값을 가진 항목
 * @example
 * maxBy([{age: 30}, {age: 20}, {age: 25}], 'age') // {age: 30}
 */
export const maxBy = <T>(array: T[], key: keyof T): T | undefined => {
  return _.maxBy(array, key as string);
};

/**
 * 배열의 특정 속성 기준으로 최솟값을 가진 항목 반환
 * @param array - 배열
 * @param key - 비교할 속성 키
 * @returns 최솟값을 가진 항목
 * @example
 * minBy([{age: 30}, {age: 20}, {age: 25}], 'age') // {age: 20}
 */
export const minBy = <T>(array: T[], key: keyof T): T | undefined => {
  return _.minBy(array, key as string);
};

/**
 * 배열의 특정 속성값들의 합계 계산
 * @param array - 객체 배열
 * @param key - 합계를 구할 속성 키
 * @returns 합계
 * @example
 * sumBy([{price: 100}, {price: 200}, {price: 300}], 'price') // 600
 */
export const sumBy = <T>(array: T[], key: keyof T): number => {
  return _.sumBy(array, key as string);
};

/**
 * 배열을 무작위로 하나의 항목 선택
 * @param array - 배열
 * @returns 무작위 항목
 * @example
 * sample([1, 2, 3, 4, 5]) // 3 (무작위)
 */
export const sample = <T>(array: T[]): T | undefined => {
  return _.sample(array);
};

/**
 * 배열을 무작위로 여러 항목 선택
 * @param array - 배열
 * @param count - 선택할 개수
 * @returns 무작위 항목들
 * @example
 * sampleSize([1, 2, 3, 4, 5], 2) // [3, 1] (무작위)
 */
export const sampleSize = <T>(array: T[], count: number): T[] => {
  return _.sampleSize(array, count);
};

/**
 * 목록에서 중복 제거된 타입 추출
 * @param T - 목록 배열
 * @returns 중복 제거된 타입 배열
 * @example
 * extractUniqueValues([{ type: '관리자', name: '조경진' }, { type: '학생', name: '홍길동' }])
 * // ['관리자', '학생']
 */
export const extractUniqueValues = <T, K extends keyof T>(
  array: T[],
  key: K,
): T[K][] => {
  return unique(pluck(array, key));
};
