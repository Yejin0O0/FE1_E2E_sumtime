'use client';

import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { Flex } from '@/components/common';
import * as S from './FAQ.styled';
import { QNA_LIST } from './constants';

function FAQ() {
  return (
    <S.Container>
      <S.Title>FAQ</S.Title>
      <S.Section>
        <Flex $direction="column" $gap="32px">
          <Box sx={{ height: 'fit-content' }}>
            <Flex $direction="column" $gap="16px">
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
            </Flex>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              자세한 문의 사항은 dbshaejin@gmail.com 로 보내주세요.
            </Typography>
          </Box>
        </Flex>
      </S.Section>
    </S.Container>
  );
}

export default FAQ;
