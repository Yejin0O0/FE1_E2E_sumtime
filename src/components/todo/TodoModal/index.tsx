import { useAppSelector } from '@/lib/hooks';
import { selectTodoUI } from '@/lib/todos/todoUISlice'; // Redux 상태 추가

import CreateTodoModal from './CreateTodoModal';
import UpdateTodoModal from './UpdateTodoModal';

export default function TodoModal() {
  const { mode } = useAppSelector(selectTodoUI);

  if (mode === 'create') {
    return <CreateTodoModal />;
  }

  if (mode === 'update') {
    return <UpdateTodoModal />;
  }
}
