'use client';

import { Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import * as S from '@/components/common';
import { QNA_LIST } from './constants';

function FAQ() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        FAQ
      </Typography>
      <S.Flex $direction="column" $gap="32px">
        <Box sx={{ height: 'fit-content' }}>
          <S.Flex $direction="column" $gap="16px">
            <Typography variant="h5" gutterBottom>
              자주 묻는 질문
            </Typography>
            <div>
              {QNA_LIST.map((QnA) => (
                <Accordion key={QnA.question}>
                  <AccordionSummary
                    id="panel-header"
                    aria-controls="panel-content"
                    expandIcon={<ExpandMore />}
                    sx={{ flexDirection: 'row-reverse', gap: '16px' }}
                  >
                    <Typography variant="body2">{QnA.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ borderTop: '1px solid #00000080' }}>
                    <Typography variant="body2">{QnA.answer}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </S.Flex>
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            문의 사항 안내
          </Typography>
          <Typography variant="body1" gutterBottom>
            자세한 문의 사항은 testEmail@gmail.com 로 보내주세요.
          </Typography>
        </Box>
      </S.Flex>
    </Container>
  );
}

export default FAQ;
