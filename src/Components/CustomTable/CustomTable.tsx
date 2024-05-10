import type { PaginationProps } from 'antd'
import { Table } from 'antd'
import styles from './CustomTable.module.scss'

type Props = {
  pagination?: PaginationProps
  scroll?: {
    x?: number
    y?: number
  }
  totalTicket?: number
  totalMoney?: number
  headerbig?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [props: string]: any
}
const CustomTable = ({ pagination, scroll = {}, totalTicket, totalMoney, ...props }: Props) => {
  const handleCustomPaginationLayout = (mapper: {
    total: number
    sizeChanger: JSX.Element
    pager: JSX.Element
    quickJumper: JSX.Element
  }) => {
    return (
      <>
        <span>{mapper.total}</span>
        <span>{mapper.sizeChanger}</span>
        <span>{mapper.pager}</span>
        <span>{mapper.quickJumper}</span>
      </>
    )
  }

  const renderTotal = (total: number) => {
    return (
      <div style={{ marginLeft: 10 }}>
        <span>Tổng</span>
        <span
          style={{
            background: '#FFF',
            display: 'inline-block',
            padding: '0 20px',
            marginLeft: 10,
            color: '#333',
            border: '1px solid #d9d9d9',
            borderRadius: '6px'
          }}
        >
          {total}
        </span>

        {/* <div style={{ marginLeft: 60, display: 'inline-block' }}>
          {Array.isArray(button)
            ? button.map((button) => (
                <>
                  {React.cloneElement(button, {
                    style: {
                      marginRight: 16
                    }
                  })}
                </>
              ))
            : button}
        </div> */}

        {totalTicket ? (
          <div style={{ marginLeft: 60, display: 'inline-block' }}>
            <span>Yêu cầu: </span>
            <span
              style={{
                background: '#FFF',
                display: 'inline-block',
                padding: '0 20px',
                marginLeft: 10,
                color: '#333',
                border: '1px solid #d9d9d9',
                borderRadius: '6px'
              }}
            >
              {totalTicket && totalTicket}
            </span>
          </div>
        ) : (
          ''
        )}

        {totalMoney ? (
          <div style={{ marginLeft: 60, display: 'inline-block' }}>
            <span>Tổng tiền: </span>
            <span
              style={{
                background: '#FFF',
                display: 'inline-block',
                padding: '0 20px',
                marginLeft: 10,
                color: '#333',
                border: '1px solid #d9d9d9',
                borderRadius: '6px'
              }}
            >
              {totalMoney && totalMoney.toLocaleString('vi-VN')}
            </span>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }

  const paginationObj = {
    total: 20,
    showSizeChanger: true,
    locale: { jump_to: 'Đi tới trang', page: '' },
    showTotal: renderTotal,
    layout: (mapper: { total: number; sizeChanger: JSX.Element; pager: JSX.Element; quickJumper: JSX.Element }) =>
      handleCustomPaginationLayout(mapper),
    ...pagination
  }

  return (
    <Table
      pagination={pagination ? paginationObj : false}
      scroll={{
        ...scroll
      }}
      {...props}
      className={styles.customTable}
      size='small'
      style={{
        ...props.style
      }}
    />
  )
}

export default CustomTable
