const asyncHandler = require('express-async-handler')
const downloadImage = require('image-downloader')
const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })
const path = require('path')

const uploadPhotoByLink = asyncHandler(async (req, res) => {
  const {photoLink} = req.body

  console.log(photoLink)

  if (!photoLink) {
    res.status(400).json({ error: 'Missing photo link' })
    return
  }

  try {
    const newName = 'photo' + Date.now() + '.jpg'
    await downloadImage.image({
      url: photoLink,
      dest: path.join(__dirname, 'public/images/', newName),
    })

    res.json(newName)
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload photo from link' })
  }
})

const uploadPhotoFromDevice = (upload.array('photos', 100), (req, res) => {
  const uploadedPhotos = []
  for (let i = 0; i < req.files.length; i++) {
    const {originalname} = req.files[i]
    const fileExtension = path.extname(originalname)
    const newPath =  req.files[i].path + fileExtension
    
    fs.renameSync(req.files[i].path, newPath)
    uploadedPhotos.push(newPath)
  }
  res.json(uploadedPhotos)
})

module.exports = {
  uploadPhotoByLink,
  uploadPhotoFromDevice
}