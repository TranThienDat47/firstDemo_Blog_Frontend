import Link from 'next/link';

function UpdatePage() {
   const listTab = [
      { id: 0, title: 'Danh sách bài viêt', href: '/dashboard', active: false },
      { id: 1, title: 'Tạo bài viêt', href: '/dashboard/create', active: false },
      { id: 2, title: 'Chỉnh sửa bài viêt', href: '/dashboard/update', active: true },
   ];
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
      </section>
   );
}

export default UpdatePage;
