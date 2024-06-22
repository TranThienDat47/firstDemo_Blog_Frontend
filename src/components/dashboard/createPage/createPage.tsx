'use client';
import { useState } from 'react';
import { useCombinedStore } from '~/stores';

function CreatePage() {
   const { userStore } = useCombinedStore();
   const [formData, setFormData] = useState({
      userID: 1,
      name: '',
      img: '',
      subName: '',
      description: '',
      content: '',
      status: 'Bản nháp',
   });

   const handleChange = (e: any) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = async (e: any) => {
      e.preventDefault();
      try {
         const response = await fetch('http://localhost:5000/api/post/create', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });
         if (response.ok) {
            alert('Post created successfully!');
            setFormData({
               userID: 1,
               name: '',
               img: '',
               subName: '',
               description: '',
               content: '',
               status: 'Bản nháp',
            });
            console.log('Post created successfully!');
         } else {
            console.error('Failed to create post:', response.statusText);
         }
      } catch (error) {
         console.error('Failed to create post:', (error as Error).message);
      }
   };

   return (
      <>
         <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-10 mb-6">Tạo bài viết</h1>
            <div className="w-full max-w-2xl bg-white p-8 rounded-md shadow-lg">
               <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Tác giả</label>
                     <input
                        type="text"
                        value={userStore.getState().user?.displayName || ''}
                        className="input input-bordered w-full mt-3"
                        disabled
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                     <input
                        name="name"
                        type="text"
                        className="input input-bordered w-full mt-1"
                        placeholder="Nhập tiêu đề phụ bài viết"
                        value={formData.name}
                        onChange={handleChange}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Tiêu đề phụ</label>
                     <input
                        name="subName"
                        type="text"
                        className="input input-bordered w-full mt-1"
                        placeholder="Nhập tiêu đề bài viết"
                        value={formData.subName}
                        onChange={handleChange}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Hình ảnh thu nhỏ</label>
                     <input
                        name="img"
                        type="text"
                        className="input input-bordered w-full mt-1"
                        placeholder="Nhập đường dẫn địa chỉ hình ảnh"
                        value={formData.img}
                        onChange={handleChange}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Mô tả</label>
                     <input
                        name="description"
                        type="text"
                        className="input input-bordered w-full mt-1"
                        placeholder="Nhập mô tả bài viết"
                        value={formData.description}
                        onChange={handleChange}
                     />
                  </div>
                  <div>
                     <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                     <textarea
                        name="content"
                        className="textarea textarea-bordered w-full mt-1"
                        placeholder="Nhập nội dung bài viết"
                        rows={6}
                        value={formData.content}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="flex justify-end">
                     <button type="submit" className="btn btn-primary">
                        Tạo bài viết
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </>
   );
}

export default CreatePage;
