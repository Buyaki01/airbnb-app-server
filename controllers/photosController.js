const asyncHandler = require('express-async-handler')

const uploadPhotoByLink = asyncHandler( async (res, req) => {
  const {photoLink} = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await downloadImage.image({
    url: photoLink,
    dest: __dirname+'/images/' +newName
  })
  
  res.json(newName)
})

module.exports = {
  uploadPhotoByLink,
}