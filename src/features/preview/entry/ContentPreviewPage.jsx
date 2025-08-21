// src/features/review/entry/ContentPreviewPage.jsx
import { useLocation, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import TopBar from '../../../components/TopBar/TopBar'
import { Button } from '../../../components/Button/Button'
import { pushAdminItem } from '../../../utils/storage'
import '../ui/ContentPreviewPage.css'

export function ContentPreviewPage() {
  const nav = useNavigate()
  const { state } = useLocation()

  const draft = useMemo(() => {
    if (state?.draft) return state.draft
    const raw = sessionStorage.getItem('contentPreviewDraft')
    if (raw) return JSON.parse(raw)
    return null
  }, [state])

  // 상호명 추출(우선순위: draft.storeName > draft.title > draft.intro에서 대충 뽑기)
  const getStoreName = (d) => {
    if (!d) return '상호명'
    if (d.storeName) return d.storeName
    if (d.title && !/^예시\s*\d+$/i.test(d.title)) return d.title
    if (d.intro) {
      // 예: "📍 푸른스시 이런 퀄리티가..." → '푸른스시'만 뽑기(간단 추출)
      const cleaned = d.intro.replace(/^📍/, '').trim()
      const firstWord = cleaned.split(/[\s,!.?]/).filter(Boolean)[0]
      if (firstWord) return firstWord
    }
    return '상호명'
  }

  const handleUpload = () => {
    if (!draft) return
    const storeName = getStoreName(draft)

    // 1) 관리자 인박스에 전송(저장)
    pushAdminItem({
      title: storeName, // ← AdminListItem의 title로 사용(= 상호명)
      // createdAt은 유틸에서 now로 기본 설정하므로 생략 가능
      status: 'pending',
    })

    // 2) 내 프로모션 페이지로 이동
    nav('/home/owner')
  }

  if (!draft) {
    return (
      <div className='contentPreview'>
        <TopBar title='제작된 게시물' />
        <p style={{ padding: 20 }}>제작된 게시물이 없습니다. 다시 생성해 주세요.</p>
      </div>
    )
  }

  return (
    <div className='contentPreview'>
      <TopBar title='제작된 게시물' />

      <section className='contentPreview__card'>
        <h1 className='cp-title'>{draft.title || '예시 1번'}</h1>

        <p className='cp-intro'>{draft.intro}</p>
        <p className='cp-lead'>{draft.lead}</p>

        <ul className='cp-list'>
          {draft.points?.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <h2 className='cp-subtitle'>✔ 메뉴 추천</h2>
        <ul className='cp-bullets'>
          {draft.menu?.map((m, i) => (
            <li key={i}>• {m}</li>
          ))}
        </ul>

        {draft.subtext?.map((t, i) => (
          <p className='cp-par' key={i}>
            {t}
          </p>
        ))}

        <p className='cp-meta'>{draft.location}</p>
        <p className='cp-meta'>{draft.hours}</p>

        <h3 className='cp-hash-title'>🧷 해시태그</h3>
        <p className='cp-hash'>{draft.hashtags}</p>

        <div className='cp-actions center'>
          <Button label='업로드' onClick={handleUpload} />
        </div>
      </section>
    </div>
  )
}
