let env: string

if (process.env.NODE_ENV === 'development') {
  env = 'dev'
} else {
  env = 'x'
}

export default env
