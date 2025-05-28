# 🌍 ONAIR - 환경 연구자를 위한 대기질 데이터 분석 플랫폼

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-ff4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query/latest)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=Zustand&logoColor=white)](https://github.com/pmndrs/zustand)

---

## 🧑‍🔬 프로젝트 개요

환경 연구자들이 **실시간 대기 정보 조회, 온실가스 예측, 사용자 데이터 분석**을 직관적으로 수행할 수 있도록 지원하는 플랫폼입니다.

- 실시간 대기질 및 온실가스 지도 기반 시각화
- 사용자가 업로드한 엑셀 데이터 자동 시각화 및 다운로드
- Text2SQL 기반의 챗봇 기능으로 DB 질의 수행 가능

---

## 📊 주요 기능

### 1. 실시간 대기질 및 예측
- 에어코리아 기반 히트맵
- 관측소별 통계 및 지도 시각화
- AI 기반 온실가스 농도 예측 (CO₂, CH₄)

### 2. 대용량 데이터 처리 최적화
- `parallelStream()` 기반 병렬 처리
- JPA + EntityManager 배치 처리
- Caffeine Cache 활용한 고속 조회

### 3. Text2SQL 챗봇
- 자연어로 복잡한 쿼리 수행
- 맵 조작, 필터링, 시각화 요청 가능

### 4. 사용자 데이터 시각화
- Excel 업로드 → 자동 시각화
- 그래프 PNG 다운로드 제공
- 그래프 유형 선택 및 필터링 가능

---

## 🧠 AI 예측 처리

- GradientBoosting 기반 온실가스 예측
- IQR 이상치 제거, 시차/롤링 피처 생성
- 피처 선택 및 하이퍼파라미터 튜닝

---

## 📈 데이터 시각화 기법

- **Labeled Multi-line Chart**: 항목별 시간대 비교
- **Binned Box Plot**: 시간/공간별 분포 비교
- **CBPF Heatmap**: 풍속/풍향 기반 영향도 분석
- **Pearson Heatmap**: 변수 간 상관계수 시각화

---

## 🗂️ 데이터 출처

- ASOS 종관 기상 관측
- 기상청 및 대기관측소 데이터
- 온실가스 협의체 (2023) 제공 데이터

---

## 💻 팀 구성

| 이름 | 역할 |
|------|------|
| 신혁수 | Frontend |
| 강인권 | Frontend |
| 나영채 | AI/ML |
| 안용식 | Backend |

---

## 🗃️ 기술 스택

- **Frontend**: React, TypeScript, TanStack Query, Tailwind CSS, Zustand
- **Backend**: Express, MySQL, JPA (TypeORM)
- **AI/ML**: Gradient Boosting, Feature Engineering
- **Infra**: Caffeine Cache, 병렬 데이터 처리 (Java)

---

## 🔗 기타

> 본 프로젝트는 환경 연구자들의 데이터 접근성과 분석 효율성을 극대화하여, 대기 환경 연구의 진입 장벽을 낮추고자 기획되었습니다.

