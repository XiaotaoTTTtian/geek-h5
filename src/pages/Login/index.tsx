import { NavBar, Form, Input, Button } from 'antd-mobile'
import { useDispatch } from 'react-redux'
import { getToken, getCodes } from '@/store/actions/login'
import { AppThunkDispatch } from '@/types/store'
import styles from './index.module.scss'
import { useHistory } from 'react-router-dom'
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
  let clearTimerRef = useRef(-1)
  const [timeLeft, setTimeLeft] = useState(0)
  // login
  const onFinish = async (value: LoginForm) => {
    try {
      await dispatch(getToken(value))
      history.push('/home')
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
      <NavBar></NavBar>
      {/* form list */}
      <div className="login-form">
        <h2 className="title">账号登录1</h2>
        <Form
          layout="horizontal"
          mode="card"
          validateTrigger={['onChange']}
          onFinish={onFinish}
          initialValues={{}}
          form={form}
        >
          <Form.Item
            className="login-item"
            name="mobile"
            validateTrigger="onChange"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
              },
            ]}
          >
            <Input placeholder="请输入手机号" ref={mobileRef} />
          </Form.Item>
          <Form.Item
            extra={
              <span onClick={getCode}>
                {timeLeft === 0 ? '发送验证码' : `${timeLeft}秒后重新发送`}
              </span>
            }
            name="code"
            className="login-item"
            validateTrigger="onChange"
            rules={[{ required: true, message: '请输入验证码' }]}
          >
            <Input placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {() => {
              // chenk to see if all fields have been manipulated
              const untouch = !form.isFieldsTouched(true)
              // form.getFieldsError() gets error information for all field names
              const disabled =
                !!form.getFieldsError().filter((item) => item.errors.length)
                  .length || untouch
              return (
                <Button
                  block
                  type="submit"
                  color="primary"
                  size="large"
                  className="login-submit"
                  disabled={disabled}
                >
                  登录
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
