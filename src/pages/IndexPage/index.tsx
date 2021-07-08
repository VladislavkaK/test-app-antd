import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import { AppDispatch, RootState } from '../../store';
import { getLibrariesAction } from '../../store/libraries/actions';
import { Library } from '../../store/libraries/types';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding-top: 100px;
  width: 100%;
  padding-bottom: 100px;
`;

type Columns = {
  title: string;
  key: string;
  dataIndex: string;
  width?: string
  sorter?: any;
  sortDirections?: any;
  render?: any
}

type FilterDropdown = {
  setSelectedKeys: (value: string[]) => void; 
  selectedKeys?: any; 
  confirm: any; 
  clearFilters: any; 
}

const IndexPage: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();

  const libraries = useSelector((state: RootState) => state.library.data);
  const isLoading = useSelector((state: RootState) => state.library.loading);
  
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    dispatch(getLibrariesAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: any) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdown) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Поиск ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Найти
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Сбросить
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Фильтровать
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: string) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: string, record: any) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    render: (text: string) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: Columns[] = [
    {
      title: 'Порядок',
      dataIndex: 'order',
      key: 'order',
      width: '50px',
    },
    {
      title: 'Название',
      dataIndex: 'fullname',
      key: 'fullname',
      width: '300px',
      render: (text: string) => <Button type='link'>{text}</Button>
    },
    {
      title: 'Регион',
      dataIndex: 'territory',
      key: 'territory',
      width: '200px',
      ...getColumnSearchProps('territory'),
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
      width: '300px',
    },
    {
      title: 'Количество библиотек',
      dataIndex: 'libraries',
      key: 'libraries',
      width: '250px',
      sorter: (a: Library, b: Library) => a.libraries - b.libraries,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  return (
    <StyledContainer>
      <Table
        loading={isLoading}
        locale={{ emptyText: 'Нет данных' }}
        columns={columns}
        dataSource={libraries}
        onRow={(record) => {
          return {
              onClick: () => {
                history.push(`/library/${record.order}`, record)
              }, 
          };
        }}
      />
    </StyledContainer>
  );
}

export default IndexPage;
