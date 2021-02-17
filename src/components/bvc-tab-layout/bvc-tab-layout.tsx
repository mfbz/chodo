import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import useDimensions from 'react-cool-dimensions';
import { BVCTabMenu } from './components/bvc-tab-menu';
import { BVCTabMenuItem } from './components/bvc-tab-menu-item';
import { BVCTabMenuItemAdd } from './components/bvc-tab-menu-item-add';
import { useTabMenuDragDropStyle } from './hooks/use-tab-menu-drag-drop-style';
import { BVCTabLayoutItem } from './interfaces/bvc-tab-layout-item';
import { useOnDragTab } from './hooks/use-on-drag-tab';
import { useOnEditTab } from './hooks/use-on-edit-tab';
import { BVCIcon } from '../bvc-icon';
import { BVCIconButton } from '../bvc-icon-button';
import { Space } from 'antd';
import { useOnDeleteTab } from './hooks/use-on-delete-tab';

export const BVCTabLayout = React.memo(function BVCTabLayout({
  items,
  addTabEnabled,
  editTabEnabled,
  deleteTabEnabled,
  dragTabEnabled,
  onAddTab,
  onSelectTab,
  onEditTab,
  onDeleteTab,
  onDragTab,
  limit = 8,
}: {
  items: BVCTabLayoutItem[];
  addTabEnabled?: boolean;
  editTabEnabled?: boolean;
  deleteTabEnabled?: boolean;
  dragTabEnabled?: boolean;
  onAddTab?: () => void;
  onSelectTab?: (item: BVCTabLayoutItem) => void;
  onEditTab?: (item: BVCTabLayoutItem) => void;
  onDeleteTab?: (item: BVCTabLayoutItem) => void;
  onDragTab?: (result: DropResult) => void;
  limit?: number;
}) {
  const { ref, height } = useDimensions();

  // Take a reference on currently selected item
  const [selectedItem, setSelectedItem] = useState<BVCTabLayoutItem | undefined>(items?.[0]);

  // Trigger on select method each time a new item is selected
  useEffect(() => {
    if (onSelectTab && selectedItem) {
      onSelectTab(selectedItem);
    }
  }, [selectedItem]);

  // Each time items change, change also selected item if it is not present anymore
  useEffect(() => {
    setSelectedItem(_item => {
      if (_item) {
        // Get new item with same id from items
        const nItem = items.find(item => item.id === _item.id);

        if (!nItem) {
          // If not present anymore select another one in the array
          return items.length ? items[0] : undefined;
        } else {
          // Return new one as selected one
          return nItem;
        }
      } else {
        // If not present anymore select another one in the array
        return items.length ? items[0] : undefined;
      }
    });
  }, [items]);

  // Methods to change tab menu list style on drag
  const { getListStyle, getItemStyle } = useTabMenuDragDropStyle();

  // Augmented methods to handle tabs
  const _onDragTab = useOnDragTab(onDragTab);
  const _onEditTab = useOnEditTab(onEditTab);
  const _onDeleteTab = useOnDeleteTab(onDeleteTab);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'row', padding: '4px 2px 4px 2px' }}>
      <BVCTabMenu>
        <DragDropContext onDragEnd={_onDragTab}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)}>
                {items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!dragTabEnabled}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                        <BVCTabMenuItem
                          item={item}
                          selected={selectedItem?.id === item.id}
                          onClick={() => setSelectedItem(item)}
                          style={snapshot.isDragging ? { background: 'lightgreen' } : undefined}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {addTabEnabled && items.length < limit && <BVCTabMenuItemAdd onClick={onAddTab} key={'addtab'} />}
      </BVCTabMenu>

      <div
        ref={ref as any}
        style={{
          flex: 1,
          height: '100%',
          background: '#CDCDCD',
          borderRadius: 10,
          padding: 10,
          marginLeft: -1,
          position: 'relative',
        }}>
        <div style={{ width: '100%', height: height, overflowY: 'auto' }}>{selectedItem?.component}</div>

        {selectedItem && (
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              zIndex: 201,
            }}>
            <Space>
              {deleteTabEnabled && (
                <BVCIconButton
                  icon={<BVCIcon src={require('./../../assets/Abort_48x48.png')} />}
                  onClick={() => _onDeleteTab(selectedItem)}
                />
              )}
              {editTabEnabled && (
                <BVCIconButton
                  icon={<BVCIcon src={require('./../../assets/Edit_48x48.png')} size={'large'} />}
                  size={'large'}
                  onClick={() => _onEditTab(selectedItem)}
                />
              )}
            </Space>
          </div>
        )}
      </div>
    </div>
  );
});
