export interface BookList {
  id: string
  title: string
  description: string
  bookIds: string[]
}

export const BOOK_LISTS: BookList[] = [
  {
    id: 'world-classics',
    title: '世界文学经典',
    description: '不可错过的世界文学大师名作',
    bookIds: [
      'd9cd1b80-20ac-44f1-abb0-5f84cdb8a50b',
      'b5f1b415-a2e8-45a2-b525-206e2c3e5fbd',
      'cf25812c-63ae-4ef7-8d98-70de1e0f3a9a',
      '2bb1279c-2958-4f30-bdbf-48a09b89d8f9',
      'f6744da0-ab7b-4ad5-bf48-5e280365bb4f',
    ],
  },
  {
    id: 'history-stories',
    title: '读历史知兴替',
    description: '从历史长河中读懂人类文明',
    bookIds: [
      'd1ebe002-9850-4308-8cd6-96c8e5ed23dd',
      'a86a965d-cd68-420d-bc08-fd55dc4cfa23',
      'ad81bbb7-386e-4bc2-8b8e-fe4502e75fa4',
      '68dda168-d40d-4b2a-a510-afdfecdf02c2',
      '5f0f3a5c-dfcf-440b-8e08-3a1c68a6f63c',
    ],
  },
  {
    id: 'popular-science',
    title: '科普新视野',
    description: '探索宇宙与科学的奥秘',
    bookIds: [
      '0a566e0d-76f7-4bd6-ac2a-1b6f5c44f3af',
      '2e08255c-827d-4a61-8c62-51d585d05ba1',
      '03b503c5-64b1-481b-8254-2599c925bdd6',
      'fd5ff9f5-a793-488b-a43b-5bd532737c6c',
      '0dfd8041-7c40-45dc-9216-25dee021a823',
    ],
  },
  {
    id: 'mind-growth',
    title: '心灵成长书单',
    description: '读懂自己，拥抱内心',
    bookIds: [
      '277e468f-9905-493e-ae02-963e61823451',
      '38d91789-0259-4980-b756-6fa643bd1635',
      '5cb5ea6f-f05b-4c74-bdf6-dfc99129166b',
      'b03249bc-436e-45b4-8eca-d4c0b592a2cf',
      'd6264132-983d-4077-879d-6035c5d44257',
    ],
  },
  {
    id: 'business-insights',
    title: '商业与经济洞察',
    description: '理解经济脉络，把握商业趋势',
    bookIds: [
      'c36821f8-7247-403a-b3c5-4886ab6a68e0',
      '0339d3b1-95a0-47e5-b5ca-bddd3337a0aa',
      '864f218b-e299-4f1c-9dc3-78c11f620b20',
      '5012cc3d-660a-4eb1-9d95-d1416f1a2ffe',
      'c1c8ebe6-cb49-43fb-9a4d-69ed710dc9b7',
    ],
  },
]
