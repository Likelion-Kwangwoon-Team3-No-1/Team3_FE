import { useState, memo, useEffect } from 'react'
import '../ui/AdminPage.css'
import { AdminListItem } from '../components/AdminListItem'
import { ReportReviewList } from '../components/ReportReviewList'
import LeftTopBar from '../../../components/LeftTopBar/LeftTopBar'
import { loadAdminItems } from '../../../utils/storage'

function AdminPage() {
  const [activeTab, setActiveTab] = useState('approved')
  const [rows, setRows] = useState([])

  // 로딩 + 포커스/스토리지 변경 시 동기화
  const refresh = () => {
    // 최신순 정렬(생략 가능)
    const data = loadAdminItems().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setRows(data)
  }

  useEffect(() => {
    refresh()
    // 다른 탭에서 업로드 후 돌아오면 갱신되도록
    const onFocus = () => refresh()
    const onStorage = (e) => {
      if (e.key === 'admin_posts') refresh()
    }
    window.addEventListener('focus', onFocus)
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  return (
    <div className='page-fixed-393'>
      <section className='admin-top' data-role='admin-top'>
        {/* 배너(헤더) */}
        <header className='admin-top__header'>
          <LeftTopBar title='관리자 페이지' />
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

        {/* 콘텐츠 */}
        <div className='admin-top__content'>
          {activeTab === 'approved' ? (
            rows.length === 0 ? (
              <div className='empty'>아직 업로드된 게시물이 없어요.</div>
            ) : (
              <div>
                {rows.map((item) => (
                  <AdminListItem
                    key={item.id}
                    title={item.title}
                    createdAt={item.createdAt}
                    status={item.status}
                    onClick={() => {
                      // 상세 보기로 이동하거나 모달 오픈 등
                      // navigate(`/admin/post/${item.id}`)
                    }}
                  />
                ))}
              </div>
            )
          ) : (
            <ReportReviewList
              onApprove={(rv) => console.log('승인:', rv.id)}
              onReject={(rv) => console.log('반려:', rv.id)}
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default memo(AdminPage)
