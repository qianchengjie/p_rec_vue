import qs from 'qs'
import axios from 'axios'

const ERROR_CODE = 0
/* export default function ({ url = null, method = 'GET', payload = null, commit = null, mutation = null, other = false }) {
  return new Promise((resolve, reject) => {
    switch (method) {
      case 'GET':
        axios.get((other ? '' : process.env.API_HOST) + url, { params: payload }).then(res => {
          if ((commit && other) || (commit && res.data.code)) { commit(mutation, { res }) }
          resolve(res)
        }).catch(res => {
          console.log(res)
        })
        break
      case 'POST':
        axios.post((other ? '' : process.env.API_HOST) + url, qs.stringify(payload)).then(res => {
          if ((commit && other) || (commit && res.data.code)) { commit(mutation, { res }) }
          resolve(res)
        }).catch(res => {
          alert(res)
        })
        break
    }
  })
} */

export default {
  get (arg1, arg2, arg3, arg4, arg5) {
    return new Promise((resolve, reject) => {
      let [url, payload, commit, mutation, other] = [null, null, null, null, null]
      if (arguments.length === 1) {
        typeof arg1 === 'string' ? url = arg1 : [url, payload, commit, mutation, other] = [arg1.url, arg1.payload, arg1.commit, arg1.mutation, arg1.other]
      } else {
        url = arg1
        switch (arguments.length) {
          case 2:
            typeof arg2 === 'boolean' ? other = arg2 : payload = arg2
            break
          case 3:
            typeof arg3 === 'boolean' ? [payload, other] = [arg2, arg3] : [commit, mutation] = [arg2, arg3]
            break
          case 4:
            if (typeof arg4 === 'boolean') {
              [commit, mutation, other] = [arg2, arg3, arg4]
            } else {
              [payload, commit, mutation] = [arg2, arg3, arg4]
            }
            break
          case 5:
            [payload, commit, mutation, other] = [arg2, arg3, arg4, arg5]
            break
          default:
            console.error('requests.get 参数错误')
            resolve({ data: null, code: ERROR_CODE, msg: 'requests.get 参数错误' })
            break
        }
      }
      axios.get((other ? '' : process.env.API_HOST) + url, { params: payload }).then(res => {
        if ((commit && other) || (commit && res.data.code === 0)) { commit(mutation, { res, payload }) }
        resolve(res)
      }).catch(res => {
        console.log(res)
        reject(res)
      })
    })
  },
  post (arg1, arg2, arg3, arg4, arg5) {
    return new Promise((resolve, reject) => {
      let [url, payload, commit, mutation, other] = [null, null, null, null, null]
      if (arguments.length === 1) {
        typeof arg1 === 'string' ? url = arg1 : [url, payload, commit, mutation, other] = [arg1.url, arg1.payload, arg1.commit, arg1.mutation, arg1.other]
      } else {
        url = arg1
        switch (arguments.length) {
          case 2:
            typeof arg2 === 'boolean' ? other = arg2 : payload = arg2
            break
          case 3:
            typeof arg3 === 'boolean' ? [payload, other] = [arg2, arg3] : [commit, mutation] = [arg2, arg3]
            break
          case 4:
            if (typeof arg4 === 'boolean') {
              [commit, mutation, other] = [arg2, arg3, arg4]
            } else {
              [payload, commit, mutation] = [arg2, arg3, arg4]
            }
            break
          case 5:
            [payload, commit, mutation, other] = [arg2, arg3, arg4, arg5]
            break
          default:
            console.error('requests.post 参数错误')
            resolve({ data: null, code: ERROR_CODE, msg: 'requests.post 参数错误' })
            break
        }
      }
      axios.post((other ? '' : process.env.API_HOST) + url, qs.stringify(payload)).then(res => {
        if ((commit && other) || (commit && res.data.code === 0)) { commit(mutation, { res, payload }) }
        resolve(res)
      }).catch(res => {
        alert(res)
        reject(res)
      })
    })
  }
}
