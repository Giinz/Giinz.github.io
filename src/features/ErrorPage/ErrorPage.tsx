import { Button, Col, Row, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import style from './ErrorPage.module.scss'

const ErrorPage: React.FC = () => {
  const [countDown, setCountDown] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1)
      if (countDown === 0) {
        navigate('/')
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [countDown, navigate])
  return (
    <section className={style.page_404}>
      <div className={style.container}>
        <Row style={{ width: '100%' }} justify={'center'}>
          <Col span={12}>
            <Col span={24} offset={1}>
              <div className={style.four_zero_four_bg}>
                <h1 className='text-center '>404</h1>
              </div>

              <div className={style.contant_box_404}>
                <Typography.Title level={2}>Chức năng này đang hoàn thiện!</Typography.Title>

                <p>Tự động trở về sau {countDown} giây!</p>

                <Button type='primary'>
                  <Link to={'/'}>Trở về trang chủ</Link>
                </Button>
              </div>
            </Col>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default ErrorPage
