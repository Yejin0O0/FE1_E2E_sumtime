const QNA_LIST: QnA[] = [
  { question: 'test1', answer: 'answer1' },
  { question: 'test2', answer: 'answer2' },
  { question: 'test3', answer: 'answer3' },
  {
    question:
      'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum ',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam malesuada massa nec sodales venenatis. Proin quam augue, venenatis quis posuere a, malesuada a erat. Sed lobortis molestie eros ullamcorper dapibus. Quisque lectus tortor, fermentum in ante vulputate, tempus lacinia mauris. Quisque posuere ut mi sit amet faucibus. Fusce pulvinar tortor ante, id imperdiet turpis ultrices eget. Aenean auctor, nulla in sodales tincidunt, velit est posuere lectus, a iaculis ex risus in est. Vivamus sed viverra est. Sed non augue vitae metus suscipit accumsan. Aenean varius eleifend nisl, et iaculis dui pellentesque eu. Pellentesque molestie massa sit amet ultrices suscipit.',
  },
];

interface QnA {
  question: string;
  answer: string;
}

export { QNA_LIST };
