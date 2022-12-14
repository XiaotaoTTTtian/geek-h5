import { NavBar, Form, Input, Button } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { getToken, getCodes } from '@/store/actions/login'
import { AppThunkDispatch } from '@/types/store'
import styles from './index.module.scss'
import { useHistory, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { InputRef } from 'antd-mobile/es/components/input'
const Login = () => {
  // form data type
  type LoginForm = {
    mobile: string
    code: string
  }
  const dispatch = useDispatch<AppThunkDispatch>()
  const history = useHistory()
  const [form] = Form.useForm()
  const mobileRef = useRef<InputRef>(null)
  const location = useLocation<{ from: string }>()
  let clearTimerRef = useRef(-1)
  const [timeLeft, setTimeLeft] = useState(0)
  // login
  const onFinish = async (value: LoginForm) => {
    try {
      await dispatch(getToken(value))
      console.log(location)

      if (location.state) {
        return history.replace(location.state.from)
      }
      history.push('/home/index')
    } catch {}
  }
  // get code
  const getCode = async () => {
    const mobile = (form.getFieldValue('mobile') ?? '') as string
    const hasError = form.getFieldError('mobile').length > 0
    if (mobile === '' || hasError) {
      // get focus
      return mobileRef.current?.focus()
    }
    await dispatch(getCodes(mobile))
    setTimeLeft(5)
    clearTimerRef.current = window.setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1)
    }, 1000)
  }
  // clear timer after reaching zero
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(clearTimerRef.current)
    }
  }, [timeLeft])
  // clean up timer when component is destroyed
  useEffect(() => {
    return () => {
      clearInterval(clearTimerRef.current)
    }
  }, [])
  return (
    <div className={styles.root}>
      {/* head navigation bar */}
      <NavBar onBack={() => history.push('/home/index')}></NavBar>
      {/* form list */}
      <div className="login-form">
        <h2 className="title">????????????</h2>
        <Form
          layout="horizontal"
          mode="card"
          validateTrigger={['onChange']}
          onFinish={onFinish}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
          }}
          form={form}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            validateTrigger="onChange"
            rules={[
              { required: true, message: '??????????????????' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '?????????????????????',
              },
            ]}
          >
            <Input placeholder="??????????????????" ref={mobileRef} />
          </Form.Item>
          <Form.Item
            extra={
              <span onClick={getCode}>
                {timeLeft === 0 ? '???????????????' : `${timeLeft}??????????????????`}
              </span>
            }
            name="code"
            className="login-item"
            validateTrigger="onChange"
            rules={[{ required: true, message: '??????????????????' }]}
          >
            <Input placeholder="??????????????????" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {() => {
              // chenk to see if all fields have been manipulated
              // const untouch = !form.isFieldsTouched(true)
              // form.getFieldsError() gets error information for all field names
              const disabled =
                !!form.getFieldsError().filter((item) => item.errors.length)
                  .length || false
              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  size="large"
                  className="login-submit"
                  disabled={disabled}
                >
                  ??????
                </Button>
              )
            }}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
export default Login
