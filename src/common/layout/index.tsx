import { Layout, Menu } from 'antd';
import React from 'react';
const { Header, Content, Footer } = Layout;
import 'antd/dist/antd.css';

interface LayoutCProps {
  children: React.ReactNode;
}
const LayoutC: React.FC<LayoutCProps> = ({children}) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(15).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `nav ${key}`,
          };
        })}
      />
    </Header>
    <Content
      style={{
        padding: '0 50px',
      }}
    >
      <div className="site-layout-content">
        {children}
      </div>
    </Content>
    <Footer
      style={{
        textAlign: 'center',
      }}
    >
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
);

export default LayoutC;
