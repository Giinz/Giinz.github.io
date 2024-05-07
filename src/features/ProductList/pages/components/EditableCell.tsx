import { Form, InputNumber } from 'antd'
import { IProduct } from '../../type/IProduct'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: IProduct
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({ editing, dataIndex, title, record, children, ...restProps }) => {
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {<InputNumber />}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export default EditableCell
