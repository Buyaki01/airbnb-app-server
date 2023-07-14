const asyncHandler = require('express-async-handler')
const downloadImage = require('image-downloader')
const multer  = require('multer')
const path = require('path')
const upload = multer({ dest: path.join(__dirname, '..', 'public', 'images') })

const uploadPhotoByLink = asyncHandler(async (req, res) => {
  const { link } = req.body

  if (!link) {
    res.status(400).json({ error: 'Missing photo link' })
    return
  }
  
  try {
    const newName = 'photo' + Date.now() + '.jpg'
    const publicDir = path.join(__dirname, '..', 'public') // Go up one level from 'controllers' 
    const destPath = path.join(publicDir, 'images', newName)

    await downloadImage.image({
      url: link,
      dest: destPath,
    })

    res.json(newName)

  } catch (error) {
    res.status(500).json({ error: 'Failed to upload photo from link' })
  }
})

const uploadPhotoFromDevice = (req, res) => {
  const upload = upload.array('photos', 100) // Assuming 'upload' is defined and correctly configured

  upload(req, res, err => {
    if (err) {
      // Handle any upload errors
      console.error(err)
      return res.status(500).json({ error: 'Failed to upload photos' })
    }

    const uploadedPhotos = []

    console.log(req.files)

    for (let i = 0; i < req.files.length; i++) {
      const { originalname } = req.files[i]
      const fileExtension = path.extname(originalname)
      const newPath = req.files[i].path + fileExtension

      fs.renameSync(req.files[i].path, newPath)
      uploadedPhotos.push(newPath)
    }

    res.json(uploadedPhotos)
  })
}

module.exports = {
  uploadPhotoByLink,
  uploadPhotoFromDevice
}