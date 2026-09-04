import { Badge } from '@/registry/primitives/badge'
import { CardFrame } from '@/registry/primitives/card'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/registry/primitives/table'

export default function Particle() {
  return (
    <CardFrame className="w-full">
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Team</TableHead>
            <TableHead className="text-right">Budget</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Website Redesign</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                Paid
              </Badge>
            </TableCell>
            <TableCell>Frontend Team</TableCell>
            <TableCell className="text-right">$12,500</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Mobile App</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-muted-foreground/64" />
                Unpaid
              </Badge>
            </TableCell>
            <TableCell>Mobile Team</TableCell>
            <TableCell className="text-right">$8,750</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">API Integration</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-amber-500" />
                Pending
              </Badge>
            </TableCell>
            <TableCell>Backend Team</TableCell>
            <TableCell className="text-right">$5,200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Database Migration</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                Paid
              </Badge>
            </TableCell>
            <TableCell>DevOps Team</TableCell>
            <TableCell className="text-right">$3,800</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">User Dashboard</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-500" />
                Paid
              </Badge>
            </TableCell>
            <TableCell>UX Team</TableCell>
            <TableCell className="text-right">$7,200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Security Audit</TableCell>
            <TableCell>
              <Badge variant="outline">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />
                Failed
              </Badge>
            </TableCell>
            <TableCell>Security Team</TableCell>
            <TableCell className="text-right">$2,100</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Budget</TableCell>
            <TableCell className="text-right">$39,550</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </CardFrame>
  )
}
