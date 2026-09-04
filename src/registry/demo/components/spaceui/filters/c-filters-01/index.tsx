'use client'

import {
  IconMail,
  IconLetterT,
  IconWorld,
  IconPhone,
  IconBell,
  IconClock,
  IconAlertCircle,
  IconCircleCheck,
  IconBan,
  IconUserCheck,
  IconUserX,
  IconUsers,
  IconStar,
  IconBuilding,
  IconFilter2,
  IconFilterX,
} from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { createFilter, Filters, type Filter, type FilterFieldConfig } from '@/registry/components/spaceui/filters'

import { cn } from '@/registry/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/registry/primitives/avatar'
import { Button } from '@/registry/primitives/button'
// Priority icon component
const PriorityIcon = ({ priority }: { priority: string }) => {
  const colors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-violet-500',
    urgent: 'bg-orange-500',
    critical: 'bg-red-500',
  }
  return <div className={cn('size-2.25 shrink-0 rounded-full', colors[priority as keyof typeof colors])} />
}

const countryFlags = [
  { code: 'AF', name: 'Afghanistan' },
  { code: 'AL', name: 'Albania' },
  { code: 'DZ', name: 'Algeria' },
  { code: 'AS', name: 'American Samoa' },
  { code: 'AD', name: 'Andorra' },
  { code: 'AO', name: 'Angola' },
  { code: 'AI', name: 'Anguilla' },
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'AR', name: 'Argentina' },
  { code: 'AM', name: 'Armenia' },
  { code: 'AU', name: 'Australia' },
  { code: 'AT', name: 'Austria' },
  { code: 'AZ', name: 'Azerbaijan' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'BD', name: 'Bangladesh' },
  { code: 'BB', name: 'Barbados' },
  { code: 'BY', name: 'Belarus' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BZ', name: 'Belize' },
  { code: 'BJ', name: 'Benin' },
  { code: 'BM', name: 'Bermuda' },
  { code: 'BT', name: 'Bhutan' },
  { code: 'BO', name: 'Bolivia' },
  { code: 'BA', name: 'Bosnia and Herzegovina' },
  { code: 'BW', name: 'Botswana' },
  { code: 'BR', name: 'Brazil' },
  { code: 'IO', name: 'British Indian Ocean Territory' },
  { code: 'BN', name: 'Brunei Darussalam' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'BF', name: 'Burkina Faso' },
  { code: 'BI', name: 'Burundi' },
  { code: 'KH', name: 'Cambodia' },
  { code: 'CM', name: 'Cameroon' },
  { code: 'CA', name: 'Canada' },
  { code: 'CV', name: 'Cape Verde' },
  { code: 'KY', name: 'Cayman Islands' },
  { code: 'CF', name: 'Central African Republic' },
  { code: 'TD', name: 'Chad' },
  { code: 'CL', name: 'Chile' },
  { code: 'CN', name: 'China' },
  { code: 'CO', name: 'Colombia' },
  { code: 'KM', name: 'Comoros' },
  { code: 'CG', name: 'Congo' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'CI', name: "Cote D'Ivoire" },
  { code: 'HR', name: 'Croatia' },
  { code: 'CU', name: 'Cuba' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'DJ', name: 'Djibouti' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'EG', name: 'Egypt' },
  { code: 'SV', name: 'El Salvador' },
  { code: 'GQ', name: 'Equatorial Guinea' },
  { code: 'ER', name: 'Eritrea' },
  { code: 'EE', name: 'Estonia' },
  { code: 'SZ', name: 'Eswatini' },
  { code: 'ET', name: 'Ethiopia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'GA', name: 'Gabon' },
  { code: 'GM', name: 'Gambia' },
  { code: 'GE', name: 'Georgia' },
  { code: 'DE', name: 'Germany' },
  { code: 'GH', name: 'Ghana' },
  { code: 'GR', name: 'Greece' },
  { code: 'GD', name: 'Grenada' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'GN', name: 'Guinea' },
  { code: 'GW', name: 'Guinea-Bissau' },
  { code: 'GY', name: 'Guyana' },
  { code: 'HT', name: 'Haiti' },
  { code: 'HN', name: 'Honduras' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IS', name: 'Iceland' },
  { code: 'IN', name: 'India' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'IR', name: 'Iran' },
  { code: 'IQ', name: 'Iraq' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IL', name: 'Israel' },
  { code: 'IT', name: 'Italy' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'JP', name: 'Japan' },
  { code: 'JO', name: 'Jordan' },
  { code: 'KZ', name: 'Kazakhstan' },
  { code: 'KE', name: 'Kenya' },
  { code: 'KR', name: 'South Korea' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'KG', name: 'Kyrgyzstan' },
  { code: 'LA', name: 'Laos' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LB', name: 'Lebanon' },
  { code: 'LS', name: 'Lesotho' },
  { code: 'LR', name: 'Liberia' },
  { code: 'LY', name: 'Libya' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MO', name: 'Macao' },
  { code: 'MG', name: 'Madagascar' },
  { code: 'MW', name: 'Malawi' },
  { code: 'MY', name: 'Malaysia' },
  { code: 'MV', name: 'Maldives' },
  { code: 'ML', name: 'Mali' },
  { code: 'MT', name: 'Malta' },
  { code: 'MH', name: 'Marshall Islands' },
  { code: 'MR', name: 'Mauritania' },
  { code: 'MU', name: 'Mauritius' },
  { code: 'MX', name: 'Mexico' },
  { code: 'FM', name: 'Micronesia' },
  { code: 'MD', name: 'Moldova' },
  { code: 'MC', name: 'Monaco' },
  { code: 'MN', name: 'Mongolia' },
  { code: 'ME', name: 'Montenegro' },
  { code: 'MA', name: 'Morocco' },
  { code: 'MZ', name: 'Mozambique' },
  { code: 'MM', name: 'Myanmar' },
  { code: 'NA', name: 'Namibia' },
  { code: 'NP', name: 'Nepal' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'NO', name: 'Norway' },
  { code: 'OM', name: 'Oman' },
  { code: 'PK', name: 'Pakistan' },
  { code: 'PA', name: 'Panama' },
  { code: 'PG', name: 'Papua New Guinea' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'PH', name: 'Philippines' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'QA', name: 'Qatar' },
  { code: 'RO', name: 'Romania' },
  { code: 'RU', name: 'Russia' },
  { code: 'RW', name: 'Rwanda' },
  { code: 'WS', name: 'Samoa' },
  { code: 'SM', name: 'San Marino' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'SN', name: 'Senegal' },
  { code: 'RS', name: 'Serbia' },
  { code: 'SG', name: 'Singapore' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'ES', name: 'Spain' },
  { code: 'LK', name: 'Sri Lanka' },
  { code: 'SE', name: 'Sweden' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SY', name: 'Syria' },
  { code: 'TW', name: 'Taiwan' },
  { code: 'TJ', name: 'Tajikistan' },
  { code: 'TZ', name: 'Tanzania' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TR', name: 'Turkey' },
  { code: 'UG', name: 'Uganda' },
  { code: 'UA', name: 'Ukraine' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'UZ', name: 'Uzbekistan' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'ZM', name: 'Zambia' },
  { code: 'ZW', name: 'Zimbabwe' },
]

export default function Pattern() {
  // Example: All Possible Filter Field Types with Grouping
  const fields: FilterFieldConfig[] = [
    {
      group: 'Basic',
      fields: [
        {
          key: 'text',
          label: 'Text',
          type: 'text',
          icon: <IconMail />,
          placeholder: 'Search text...',
        },
        {
          key: 'email',
          label: 'Email',
          type: 'text',
          icon: <IconLetterT />,
          placeholder: 'user@example.com',
        },
        {
          key: 'website',
          label: 'Website',
          icon: <IconWorld />,
          type: 'text',
          placeholder: 'https://example.com',
        },
        {
          key: 'phone',
          label: 'Phone',
          icon: <IconPhone />,
          type: 'text',
          placeholder: '+1 (123) 456-7890',
        },
      ],
    },
    {
      group: 'Select',
      fields: [
        {
          key: 'status',
          label: 'Status',
          icon: <IconBell />,
          type: 'select',
          searchable: false,
          className: 'w-[200px]',
          options: [
            {
              value: 'todo',
              label: 'To Do',
              icon: <IconClock className="stroke-violet-500" />,
            },
            {
              value: 'in-progress',
              label: 'In Progress',
              icon: <IconAlertCircle className="stroke-yellow-500" />,
            },
            {
              value: 'done',
              label: 'Done',
              icon: <IconCircleCheck className="stroke-green-500" />,
            },
            {
              value: 'cancelled',
              label: 'Cancelled',
              icon: <IconBan className="stroke-destructive" />,
            },
          ],
        },
        {
          key: 'priority',
          label: 'Priority',
          icon: <IconBan />,
          type: 'multiselect',
          className: 'w-[180px]',
          options: [
            {
              value: 'low',
              label: 'Low',
              icon: <PriorityIcon priority="low" />,
            },
            {
              value: 'medium',
              label: 'Medium',
              icon: <PriorityIcon priority="medium" />,
            },
            {
              value: 'high',
              label: 'High',
              icon: <PriorityIcon priority="high" />,
            },
            {
              value: 'urgent',
              label: 'Urgent',
              icon: <PriorityIcon priority="urgent" />,
            },
            {
              value: 'critical',
              label: 'Critical',
              icon: <PriorityIcon priority="critical" />,
            },
          ],
        },
        {
          key: 'assignee',
          label: 'Assignee',
          icon: <IconUserCheck />,
          type: 'multiselect',
          maxSelections: 5,
          options: [
            {
              value: 'john',
              label: 'John Doe',
              icon: (
                <Avatar className="size-5 border">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=nova&variant=solar-flare" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'jane',
              label: 'Jane Smith',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=pulsar&variant=titan" alt="Jane Smith" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'bob',
              label: 'Bob Johnson',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=quasar&variant=glass" alt="Bob Johnson" />
                  <AvatarFallback>BJ</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'alice',
              label: 'Alice Brown',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=comet&variant=pebble" alt="Alice Brown" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'nick',
              label: 'Nick Bold',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=apollo&variant=invader" alt="Nick Bold" />
                  <AvatarFallback>NB</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'sarah',
              label: 'Sarah Wilson',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=gemini&variant=kendo" alt="Sarah Wilson" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'michael',
              label: 'Michael Scott',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=luna&variant=lumina" alt="Michael Scott" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'emily',
              label: 'Emily Blunt',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=mars&variant=shaula" alt="Emily Blunt" />
                  <AvatarFallback>EB</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'david',
              label: 'David Gandy',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage
                    src="https://avatars.spaceui.one/v1?name=jupiter&variant=singularity"
                    alt="David Gandy"
                  />
                  <AvatarFallback>DG</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'laura',
              label: 'Laura Palmer',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=saturn&variant=triton" alt="Laura Palmer" />
                  <AvatarFallback>LP</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'kevin',
              label: 'Kevin Hart',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=venus&variant=solar-flare" alt="Kevin Hart" />
                  <AvatarFallback>KH</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'anna',
              label: 'Anna Kendrick',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=mercury&variant=titan" alt="Anna Kendrick" />
                  <AvatarFallback>AK</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'tom',
              label: 'Tom Cruise',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=pluto&variant=glass" alt="Tom Cruise" />
                  <AvatarFallback>TC</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'lisa',
              label: 'Lisa Kudrow',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=neptune&variant=pebble" alt="Lisa Kudrow" />
                  <AvatarFallback>LK</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'james',
              label: 'James Bond',
              icon: (
                <Avatar className="size-5">
                  <AvatarImage src="https://avatars.spaceui.one/v1?name=uranus&variant=invader" alt="James Bond" />
                  <AvatarFallback>JB</AvatarFallback>
                </Avatar>
              ),
            },
            {
              value: 'unassigned',
              label: 'Unassigned',
              icon: (
                <Avatar className="size-5">
                  <AvatarFallback>
                    <IconUserX />
                  </AvatarFallback>
                </Avatar>
              ),
            },
          ],
        },
        {
          key: 'userType',
          label: 'User Type',
          icon: <IconUsers />,
          type: 'select',
          searchable: false,
          className: 'w-[200px]',
          options: [
            {
              value: 'premium',
              label: 'Premium',
              icon: <IconStar className="size-3 text-yellow-500" />,
            },
            {
              value: 'standard',
              label: 'Standard',
              icon: <IconBuilding className="size-3 text-blue-500" />,
            },
            {
              value: 'trial',
              label: 'Trial',
              icon: <IconClock className="size-3 text-gray-500" />,
            },
          ],
        },
        {
          key: 'country',
          label: 'Country',
          icon: <IconWorld />,
          type: 'select',
          searchable: true,
          className: 'w-[220px]',
          options: countryFlags.map((country) => ({
            value: country.code,
            label: country.name,
            icon: (
              <img
                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                alt={country.code}
                className="size-4 rounded-full object-cover"
              />
            ),
          })),
        },
      ],
    },
  ]

  const [filters, setFilters] = useState<Filter[]>([
    createFilter('priority', 'is_any_of', ['low', 'medium', 'critical']),
  ])

  const handleFiltersChange = useCallback((filters: Filter[]) => {
    setFilters(filters)
  }, [])

  return (
    <div className="flex grow content-start items-start gap-2.5 self-start">
      <div className="grow space-y-5">
        {/* Filters Section */}
        <div className="flex items-start gap-2.5">
          <div className="flex-1">
            <Filters
              filters={filters}
              fields={fields}
              onChange={handleFiltersChange}
              shortcutKey="f"
              shortcutLabel="F"
              enableShortcut={true}
              trigger={
                <Button variant="outline">
                  <IconFilter2 />
                  Add Filter
                </Button>
              }
            />
          </div>

          {filters.length > 0 && (
            <Button variant="outline" onClick={() => setFilters([])}>
              <IconFilterX />
              Clear
            </Button>
          )}
        </div>

        {/* Debug Block */}
        <pre className="bg-muted dark:bg-muted/60 mt-2 max-h-[400px] w-full max-w-[500px] overflow-auto overflow-x-auto rounded-md border p-3 text-xs">
          {JSON.stringify(filters, null, 2)}
        </pre>
      </div>
    </div>
  )
}
