import styles from './index.module.scss'
type Props = {
  onClose: () => void
  type: '' | 'gender' | 'photo'
  onUpdateProfile: (type: 'gender' | 'photo', value: string) => void
}
const genderList = [
  { text: '男', value: '0' },
  { text: '女', value: '1' },
]

const photoList = [
  { text: '拍照', value: 'photograhp' },
  { text: '本地选择', value: 'local' },
]
const EditList = ({ onClose, type, onUpdateProfile }: Props) => {
  const list = type === 'gender' ? genderList : photoList
  return (
    <div className={styles.root} onClick={() => onClose()}>
      {/* <div className="list-item" onClick={() => onUpdateProfile('gender', '0')}>
        男
      </div>
      <div className="list-item" onClick={() => onUpdateProfile('gender', '1')}>
        女
      </div> */}
      {list.map((item) => (
        <div
          className="list-item"
          key={item.text}
          onClick={() => type === '' || onUpdateProfile(type, item.value)}
        >
          {item.text}
        </div>
      ))}

      <div className="list-item" onClick={() => {}}>
        取消
      </div>
    </div>
  )
}

export default EditList
