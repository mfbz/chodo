import { useCallback } from 'react';

export function useTabMenuDragDropStyle() {
  const getListStyle = useCallback((isDraggingOver: boolean) => {
    return {
      background: isDraggingOver ? 'lightblue' : undefined,
      borderRadius: '5px 0px 0px 5px',
    };
  }, []);

  const getItemStyle = useCallback((isDragging: boolean, draggableStyle?: any) => {
    return {
      userSelect: 'none',
      marginBottom: 5,
      // styles we need to apply on draggables
      ...draggableStyle,
    };
  }, []);

  return { getListStyle, getItemStyle };
}
