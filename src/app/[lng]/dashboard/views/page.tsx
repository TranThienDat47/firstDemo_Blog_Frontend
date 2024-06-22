import classNames from 'classnames/bind';
import style from './style.module.scss';
import Link from 'next/link';

const cx = classNames.bind(style);

interface UserData {
   _id?: number;
   img: string;
   name: string;
   subName: string;
   desciption?: string;
   status?: string;
   updatedAt?: string;
}

// const data: UserData[] = [
//    {
//       img: 'https://img.daisyui.com/tailwind-css-component-profile-2@56w.png',
//       name: 'Hart Hagerty',
//       subName: 'United States',
//       job: 'Zemlak, Daniel and Leannon',
//       jobBadge: 'Desktop Support Technician',
//       favoriteColor: 'Purple',
//    },
//    {
//       img: 'https://img.daisyui.com/tailwind-css-component-profile-3@56w.png',
//       name: 'Brice Swyre',
//       subName: 'China',
//       job: 'Carroll Group',
//       jobBadge: 'Tax Accountant',
//       favoriteColor: 'Red',
//    },
//    {
//       img: 'https://img.daisyui.com/tailwind-css-component-profile-4@56w.png',
//       name: 'Marjy Ferencz',
//       subName: 'Russia',
//       job: 'Rowe-Schoen',
//       jobBadge: 'Office Assistant I',
//       favoriteColor: 'Crimson',
//    },
//    {
//       img: 'https://img.daisyui.com/tailwind-css-component-profile-5@56w.png',
//       name: 'Yancy Tear',
//       subName: 'Brazil',
//       job: 'Wyman-Ledner',
//       jobBadge: 'Community Outreach Specialist',
//       favoriteColor: 'Indigo',
//    },
// ];

const converterDate = (dateString: string, time: boolean = false) => {
   const date = new Date(dateString);

   const day = date.getDate().toString().padStart(2, '0');
   const month = (date.getMonth() + 1).toString().padStart(2, '0');
   const year = date.getFullYear().toString();

   const formattedDate = `${day}-${month}-${year}`;

   return formattedDate;
};

async function getData() {
   try {
      const response = await fetch('http://localhost:5000/api/post/search?skip=0&limit=22&key=&sort=DESC');
      if (!response.ok) {
         throw new Error('Failed to fetch posts');
      }

      const result = await response.json();

      return result.data;
   } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [{}];
   }
}

export default async function Home() {
   const listTab = [
      { id: 0, title: 'Danh sách bài viêt', href: '/dashboard', active: true },
      { id: 1, title: 'Tạo bài viêt', href: '/dashboard/create', active: false },
      { id: 2, title: 'Chỉnh sửa bài viêt', href: '/dashboard/update', active: false },
   ];

   const data = await getData();

   return (
      <section>
         <div role="tablist" className="tabs tabs-boxed mt-9 p-3">
            {listTab.map((element) => (
               <Link
                  key={element.id}
                  href={element.href}
                  role="tab"
                  className={`tab ${element.active ? 'tab-active' : ''}`}
               >
                  {element.title}
               </Link>
            ))}
         </div>
         <div className={'min-h-screen bg-gray-100 flex flex-row flex-start items-start bg-gray-100'}>
            <div className="flex-1 overflow-x-auto">
               <table className="table">
                  <thead>
                     <tr>
                        <th>
                           <label>
                              <input type="checkbox" className="checkbox" />
                           </label>
                        </th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Recently modified</th>
                        <th></th>
                     </tr>
                  </thead>
                  <tbody>
                     {data.map((item: UserData) => (
                        <tr key={item._id}>
                           <td>
                              <label>
                                 <input type="checkbox" className="checkbox" />
                              </label>
                           </td>
                           <td>
                              <div className="flex items-center gap-3">
                                 <div className="avatar">
                                    <div className="mask rounded w-12 h-12">
                                       <img src={item.img} alt="thumb" />
                                    </div>
                                 </div>
                                 <div>
                                    <div className="font-bold">{item.name}</div>
                                    <div className="text-sm opacity-50">{item.subName}</div>
                                 </div>
                              </div>
                           </td>
                           <td>
                              {item.desciption}
                              <br />
                              <span className="badge badge-ghost badge-sm">{item.name}</span>
                           </td>
                           <td>{item.status}</td>
                           <td>{item.status}</td>
                           <td>{converterDate(item?.updatedAt || '')}</td>
                           <td>
                              <button className="btn btn-ghost btn-xs">details</button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
                  <tfoot>
                     <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Recently modified</th>
                        <th></th>
                     </tr>
                  </tfoot>
               </table>
            </div>
         </div>
      </section>
   );
}
