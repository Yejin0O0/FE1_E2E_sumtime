const QNA_LIST: QnA[] = [
  {
    question: '기존에 있던 카테고리를 삭제하면 어떻게 되나요?',
    answer: '기존에 삭제하던 카테고리를 삭제한 경우, 해당 카테고리로 선택되어있던 todo들은 카테고리 미선택 todo로 변동됩니다.',
  },
  {
    question: '카테고리 속성 중 차트 미포함시 어떻게 되나요?',
    answer: '카테고리를 차트에 미포함 할시, 기록되지 않는 시간으로 해당 카테고리 하위의 todo들의 시간이 기록됩니다.',
  },
  { question: '탈퇴는 어떻게 하나요?', answer: '탈퇴를 원하신다면, 문의 이메일 dbshaejin@gmail.com으로 문의 부탁드립니다!' },
];

interface QnA {
  question: string;
  answer: string;
}

export { QNA_LIST };
