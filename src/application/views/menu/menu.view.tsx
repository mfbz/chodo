import React from 'react';
import { useMenuRoutes } from './hooks/use-menu-routes';
import { List } from 'antd';
import { MenuButton } from './components/menu-button';
import { useNavigateToUrl } from '../../hooks/use-navigate-to-url';

export const MenuView = React.memo(function MenuView() {
  const menuRoutes = useMenuRoutes();
  const navigateToUrl = useNavigateToUrl();

  return (
    <div style={{ width: '100%', height: '100%', padding: 16 }}>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={menuRoutes}
        renderItem={item => (
          <List.Item>
            <MenuButton
              text={item.title}
              icon={React.cloneElement(item.icon as React.ReactElement<any>, { size: 'large' })}
              onClick={() => navigateToUrl(item.url)}
            />
          </List.Item>
        )}
      />
    </div>
  );
});
