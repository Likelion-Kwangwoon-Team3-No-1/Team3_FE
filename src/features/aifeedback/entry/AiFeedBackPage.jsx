import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import TopBar from '../../../components/TopBar/TopBar'
import { Button } from '../../../components/Button/Button'
import uncheckedIcon from '../../../assets/review/review-checkbox-default.svg'
import checkedIcon from '../../../assets/review/review-checkbox-filled.svg'
import '../ui/AiFeedBackPage.css'

export function AiFeedBackPage() {
  const nav = useNavigate()
  const { state } = useLocation()

  const [draft, setDraft] = useState(() => {
    if (state?.draft) return state.draft
    const raw = sessionStorage.getItem('contentPreviewDraft')
    if (raw) return JSON.parse(raw)
    return {
      title: '예시 1번',
      intro: '📍 노원역에서 이런 스시 퀄리티가 가능하다고…? 🍣',
      lead: '방문 소감 한 줄 요약을 여기에.',
      points: [
        '🤤 숙성/손질 상태 깔끔, 신선함 그대로 전달',
        '샐러드부터 우동까지 하나하나 퀄리티 좋음',
      ],
      menu: ['연어/광어/참치 혼합 초밥 세트 🍣', '냉우동 or 따뜻한 미소국 사이드 선택 가능'],
      subtext: [
        '혼밥도 부담 없고 내부가 조용해서 공부하다 들르기 좋음.',
        '학생증 보여주면 음료 서비스까지?! 🥤',
      ],
      location: '📍 위치: 역 기준 도보 2분',
      hours: '🕒 영업시간: 오전 11:30 ~ 오후 9:00 (브레이크 3~5시)',
      hashtags: '#노원스시맛집 #가성비스시 #혼밥환영 #연어맛집',
    }
  })

  const [checked, setChecked] = useState(true)

  const handleRegenerateAndGo = () => {
    if (!checked) {
      alert('예시 1번을 체크해 주세요.')
      return
    }
    // 간단 변주(셔플) 후 프리뷰로 이동
    const shuffle = (arr = []) => [...arr].sort(() => Math.random() - 0.5)
    const nextDraft = { ...draft, points: shuffle(draft.points), menu: shuffle(draft.menu) }
    sessionStorage.setItem('contentPreviewDraft', JSON.stringify(nextDraft))
    nav('/content-preview', { state: { draft: nextDraft } })
  }

  return (
    <div className='aiPreview'>
      <TopBar title='제작된 게시물' />

      <div className='aiHeaderRow'>
        <div className='aiTitle'>{draft.title}</div>
        <button
          type='button'
          className='aiCheckBtn'
          onClick={() => setChecked((v) => !v)}
          aria-label='선택 토글'
        >
          <img src={checked ? checkedIcon : uncheckedIcon} alt='' />
        </button>
      </div>

      <section className={`aiCard ${checked ? '' : 'is-dimmed'}`}>
        <p className='aiIntro'>{draft.intro}</p>
        <p className='aiLead'>{draft.lead}</p>
        <ul className='aiList'>
          {draft.points?.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>

        <h2 className='aiSubTitle'>✔ 메뉴 추천</h2>
        <ul className='aiBullets'>
          {draft.menu?.map((m, i) => (
            <li key={i}>• {m}</li>
          ))}
        </ul>

        {draft.subtext?.map((t, i) => (
          <p className='aiPar' key={i}>
            {t}
          </p>
        ))}

        <p className='aiMeta'>{draft.location}</p>
        <p className='aiMeta'>{draft.hours}</p>

        <h3 className='aiHashTitle'>🧷 해시태그</h3>
        <p className='aiHash'>{draft.hashtags}</p>
      </section>

      <div className='aiBottom'>
        <Button label='재생성' onClick={handleRegenerateAndGo} />
      </div>
    </div>
  )
}
