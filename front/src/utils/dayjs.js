import dayjs from 'dayjs'
import 'dayjs/locale/ja'

import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)
dayjs.extend(relativeTime)

export default dayjs