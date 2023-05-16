import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
YupPassword(Yup)

function Register() {
  const navigate= useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [show, setShow] = useState(false)
  const showPass = () => {
    setShow(!show)
  }
    const RegisterSchema = Yup.object().shape({
        username: Yup.string().min(6, "min 6 char").required("Please Fill"),
        email: Yup.string().email("wrong format").required("Please Fill"),
        password: Yup.string().min(8, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .required("Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minLowercase(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minNumbers(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minUppercase(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol")
            .minSymbols(1, "Password must be min 8 char long and contain:Number,lowecase,uppercase,and symbol"),
        confPass: Yup.string().required("Please Fill")
    })
  const registerUser = async (value) => {
    setIsRegister(true)
      try {
        let response = await axios.post('http://localhost:8001/auth/register', value)
        alert(response.data.message);
        if (response.data.message === 'Register Succes') {
          alert('Verification Link has been sent to your account')
          navigate('/')
          
        }
        
      } catch (error) {
        console.log('error');
      } finally {
        setIsRegister(false)
      }
        
    }
    return (
        <div>
            <Formik
                initialValues={{ username: '', email: '', password: '',confPass:'' }}
                validationSchema={RegisterSchema}
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
             Register Account
            </h2>
           
          </div>
          <Form className="mt-8 space-y-6 " action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
                                <div className="-space-y-px rounded-md shadow-sm ">
                                <div>
                <label htmlFor="username" className="sr-only">
                  User Name
                </label>
                <Field
                  id="username"
                  name="username"
                  type="username"
                  autoComplete=""
                  required
                  className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="User Name"
                                        />
                 <ErrorMessage
                                    component="div"
                                    name="username"
                                    className=' text-red-500' />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <Field
                  id="email-address"
                  name="email"
                  type="text"
                  autoComplete=""
                  required
                  className="relative block w-full rounded-t-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Email address"
                                        />
                 <ErrorMessage
                                    component="div"
                                    name="email"
                                    className=' text-red-500' />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type={show?'text':"password"}
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
                  type={show?'text':"password"}
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
                    <button onClick={()=>showPass()}>{show?'Hide Password':'Show Password'}</button>
              <button
                type="submit"
                      className={`${isRegister?'pointer-events-none opacity-40': ''} group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold
                 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
                      focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
              
                Register
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

export default Register