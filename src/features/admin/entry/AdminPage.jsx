import { useState, memo, useMemo } from 'react'
import '../ui/AdminPage.css'
import { ListItem } from '../../../components/List/ListItem'
import { ReportReviewList } from '../components/ReportReviewList'

function AdminPage() {
  const [activeTab, setActiveTab] = useState('approved')

  // 📌 데모용 데이터 (API로 대체 가능)
  const approvedData = useMemo(
    () => [
      { id: 1, title: '푸른스시', createdAt: '2025-08-03T11:30:00' },
      { id: 2, title: '푸른스시', createdAt: '2025-08-03T11:30:00' },
      { id: 3, title: '푸른스시', createdAt: '2025-08-03T11:30:00' },
      { id: 4, title: '푸른스시', createdAt: '2025-08-03T11:30:00' },
    ],
    [],
  )

  return (
    <section className='admin-top' data-role='admin-top'>
      {/* 배너(헤더) */}
      <header className='admin-top__header'>
        <h1 className='admin-top__title'>관리자페이지</h1>
      </header>

      {/* 탭 */}
      <nav className='admin-top__tabs' role='tablist' aria-label='관리자 탭'>
        <button
          role='tab'
          aria-selected={activeTab === 'approved'}
          className={`admin-top__tab ${activeTab === 'approved' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          확정 콘텐츠
        </button>
        <button
          role='tab'
          aria-selected={activeTab === 'reported'}
          className={`admin-top__tab ${activeTab === 'reported' ? 'is-active' : ''}`}
          onClick={() => setActiveTab('reported')}
        >
          신고 리스트
        </button>
      </nav>

      {/* 아래 콘텐츠 영역 (데모용) */}
      <div className='admin-top__content'>
        {activeTab === 'approved' ? (
          <div>
            {approvedData.map((item) => (
              <ListItem key={item.id} title={item.title} createdAt={item.createdAt} />
            ))}
          </div>
        ) : (
          <ReportReviewList
            onApprove={(rv) => console.log('승인:', rv.id)}
            onReject={(rv) => console.log('반려:', rv.id)}
          />
        )}
      </div>
    </section>
  )
}

export default memo(AdminPage)
