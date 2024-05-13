import { Form, Input, InputNumber } from 'antd'

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  inputType: 'number' | 'text'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  record: any
  index: number
  children: React.ReactNode
  toggleEdit?: () => void
}

const EditableCell: React.FC<EditableCellProps> = ({
  record,
  editing,
  dataIndex,
  title,
  children,
  toggleEdit,
  inputType,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <InputNumber
        type='number'
        controls={false}
        style={{ width: '100%' }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            toggleEdit?.()
          }
        }}
      />
    ) : (
      <Input style={{ width: '100%' }} />
    )

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex + '_' + record?.id}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `${title} không được để trống!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export default EditableCell
