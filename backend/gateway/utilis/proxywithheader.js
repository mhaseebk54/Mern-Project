import proxy from 'express-http-proxy'

const proxywithHeader = (serviceURL) =>{
    return proxy(serviceURL , {
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            if (srcReq.user) {
                 proxyReqOpts.headers["x-user-id"]= srcReq.user.userId
            }
           
        }
        })
    }


export default proxywithHeader;
