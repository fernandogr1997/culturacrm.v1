import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDropzone } from 'react-dropzone';

//url
import { backendApi } from '../../backendApi/backendApi';

//mui material ui
import LoadingButton from '@mui/lab/LoadingButton';
import CancelIcon from '@mui/icons-material/Cancel';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//css
import '../../styles/Fileupload.css';
import { actualizarDashboard } from '../../app/slices/credencialesSlice';
import { useDispatch } from 'react-redux';

export const Dropzone = ({className,recargar, id}) => {
    const [files, setFiles] = useState([])
    const [rejected, setRejected] = useState([])
    const [Loading, setLoading] = useState(false)

    const dispatch = useDispatch();
  
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        ])
      }
  
      if (rejectedFiles?.length) {
        setRejected(previousFiles => [...previousFiles, ...rejectedFiles])
      }
    }, [])
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        'image/png': [],
        'image/jpeg': [],
        'image/jpg': [],
        'image/gif': [],
        'application/pdf':[]
      },
      maxSize: 1024 * 1000,
      onDrop
    })
  
    useEffect(() => {
      // Revoke the data uris to avoid memory leaks
      return () => files.forEach(file => URL.revokeObjectURL(file.preview))
    }, [files])
  
    const removeFile = name => {
      setFiles(files => files.filter(file => file.name !== name))
    }
  
    const removeAll = () => {
      setFiles([])
      setRejected([])
    }
  
    const removeRejected = name => {
      setRejected(files => files.filter(({ file }) => file.name !== name))
    }
  
    const handleSubmit = async e => {
      e.preventDefault()
      setLoading(true);
      
      if (!files?.length){
        setLoading(false)
        return;
      } 
      
      files.forEach(async(file) =>{
        const formData = new FormData();
        
        formData.append('file', file)
        
        const {data} = await axios({
          method: 'POST',
          url:`${backendApi}/news_documentos/${id}`,
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
      });
      
      setFiles([]);
      setRejected([]);
      setLoading(false);
      dispatch(actualizarDashboard());
      recargar();
      
      
    }
    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div
        {...getRootProps({
          className: className
        })}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <CloudUploadIcon className='w-5 h-5 fill-current' />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag & drop files here, or click to select files</p>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className='mt-10'>
        <div className='flex gap-4'>
          <h2 className='title text-3xl font-semibold'>Preview</h2>
          <button
            type='button'
            onClick={removeAll}
            className='mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-red-600 hover:text-white transition-colors'
          >
            Remove all files
          </button>
          <LoadingButton
            type='submit'
            loading={Loading}
            sx={{
              color:'#808080',
              backgroundColor:'white',
              fontSize:12,
              fontWeight:'bold',
              paddingX:3,
              paddingY:1,
              border: 1,
              borderColor:'#C0C0C0',
              '&:hover':{
                color:'white',
                backgroundColor:'blue',
                borderColor:'blue'
              }
            }}
            className='ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors'
          >
            Upload
          </LoadingButton>
        </div>

        {/* Accepted files */}
        <h3 className='title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3'>
          Accepted Files
        </h3>
        <ul className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10'>
          {files.map(file =>{
            let name = file.name;
            
          return (
              <li key={file.name} className='relative h-32 rounded-md shadow-lg'>
                {
                  (name.includes('.pdf'))
                  ?<img
                  src='/pdf.png'
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                  className='h-full w-full object-contain rounded-md'
                />
                  :<img
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview)
                  }}
                  className='h-full w-full object-contain rounded-md'
                />
                }
                

                <button
                  type='button'
                  className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors'
                  onClick={() => removeFile(file.name)}
                >
                  <CancelIcon className='w-5 h-5 fill-white hover:fill-secondary-400 transition-colors' />
                </button>
                <p className='mt-2 text-neutral-500 text-[12px] font-medium'>
                  {file.name}
                </p>
              </li>
            )
          }
          )}
        </ul>

        {/* Rejected Files */}
        <h3 className='title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3'>
          Rejected Files
        </h3>
        <ul className='mt-6 flex flex-col'>
          {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between'>
              <div>
                <p className='mt-2 text-neutral-500 text-sm font-medium'>
                  {file.name}
                </p>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type='button'
                className='mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors'
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </section>
    </form>
    )
}
