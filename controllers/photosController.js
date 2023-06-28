const asyncHandler = require('express-async-handler')
const downloadImage = require('image-downloader')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })
const path = require('path')

const uploadPhotoByLink = asyncHandler( async (req, res) => {
  const {photoLink} = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await downloadImage.image({
    url: photoLink,
    dest: __dirname+'/images/' +newName
  })

  res.json(newName)
})

const uploadPhotoFromDevice = asyncHandler(upload.array('photos', 100), async (req, res) => {
  const uploadedPhotos = []
  for (let i = 0; i < req.photos.length; i++) {
    const {originalname} = req.photos[i]
    const fileExtension = path.extname(originalname)
    const newPath =  req.photos[i].path + fileExtension
    
    fs.renameSync(req.photos[i].path, newPath)
    uploadedPhotos.push(newPath.replace('images\\',''))
  }
  res.json(uploadedPhotos)
})

module.exports = {
  uploadPhotoByLink,
  uploadPhotoFromDevice
}