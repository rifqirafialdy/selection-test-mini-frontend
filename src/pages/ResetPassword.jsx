import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
YupPassword(Yup)

function ResetPassword() {
    const { token } = useParams()
    const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const openPass = () => {
    setOpen(!open)
}

    const ResetSchema = Yup.object().shape({
        password: Yup.string().min(8, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .required("Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minLowercase(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minNumbers(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minUppercase(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minSymbols(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol"),
        confPass: Yup.string().required("Please Fill")
    })
    const registerUser = async (value) => {
        let response = await axios.post('http://localhost:8001/auth/reset-password', value, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        if (response.data.message === 'Your New Password Set Succesfully') {
            alert(response.data.message)
            navigate('/')
         
        } else {
          alert('You Already Request Another Link, Please use latest Link')
          navigate('/')
        }     
    }
    return (
        <div>
            <Formik
                initialValues={{ password: '',confPass:'' }}
                validationSchema={ResetSchema}
                onSubmit={(value) => {
                   registerUser(value)
                    console.log(value);
                }}
            >
                  <>
    <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
          
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
             Reset Password
            </h2>
           
          </div>
          <Form className="mt-8 space-y-6 " action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
                                <div className="-space-y-px rounded-md shadow-sm ">
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type={open?'text':"password"}
                  autoComplete=""
                  required
                  className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Password"
                                        />
                  <ErrorMessage
                                    component="div"
                                    name="password"
                                    className=' text-red-500 te' />
              </div>
              <div>
                <label htmlFor="confPass" className="sr-only">
                  Confirm your Password
                </label>
                <Field
                  id="confPass"
                  name="confPass"
                  type={open?'text':"password"}
                  autoComplete=""
                  required
                  className="relative block w-full rounded-b-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Confirm Password"
                                        />
                  <ErrorMessage
                                    component="div"
                                    name="confPass"
                                    className=' text-red-500 te' />
              </div>

            </div>
            <div>
              <button onClick={()=>openPass()}>{open?'Hide Password':'Show Password'}</button>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
              
                Reset
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>

        
            </Formik>
        </div>
  )
}

export default ResetPassword