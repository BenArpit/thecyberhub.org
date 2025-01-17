import React, { useEffect, useState } from "react";
import {
    AchievementHeading,
    AchievementLink,
    AchievementList,
    AddButtonSection,
} from "../Achievements/AchievementsElements";
import {
    AddSkillInput,
    IconAdd,
    RemoveButton,
    SkillSetContainer,
    SkillSetListItem,
} from "../SkillSet/SkillSetElements";

const SkillSet = ({ skills, setUserDetailData }) => {
    const [updatedSkills, setUpdatedSkills] = useState(skills || []);

    const handleTitleChange = (titleIndex, value) => {
        const updatedTitles = [...updatedSkills[0].skill];
        updatedTitles[titleIndex].skillName = value;
        setUpdatedSkills([{ ...updatedSkills[0], skill: updatedTitles }]);
    };

    const handleAddTitle = () => {
        if (updatedSkills.length === 0) {
            setUpdatedSkills([{ skill: [] }]);
        } else {
            const updatedTitles = [...updatedSkills[0].skill];
            updatedTitles.push({
                skillName: "",
                skillLink: "",
            });
            setUpdatedSkills([{ ...updatedSkills[0], skill: updatedTitles }]);
        }
    };

    const handleRemoveTitle = (titleIndex) => {
        const updatedTitles = [...updatedSkills[0].skill];
        updatedTitles.splice(titleIndex, 1);
        setUpdatedSkills([{ ...updatedSkills[0], skill: updatedTitles }]);
    };

    useEffect(() => {
        setUserDetailData((prevState) => ({
            ...prevState,
            skills: updatedSkills,
        }));
    }, [updatedSkills]);

    return (
        <SkillSetContainer>
            <AchievementHeading>Skills</AchievementHeading>
            <AchievementList>
                <SkillSetListItem>
                    {updatedSkills?.length >= 0 &&
                        updatedSkills[0]?.skill?.map((title, titleIndex) => (
                            <AchievementLink key={titleIndex}>
                                <AddSkillInput
                                    type="text"
                                    value={title.skillName}
                                    placeholder={"Add a Skill"}
                                    onChange={(e) => handleTitleChange(titleIndex, e.target.value)}
                                />
                                <RemoveButton onClick={() => handleRemoveTitle(titleIndex)}>
                                    <RemoveButton />
                                </RemoveButton>
                            </AchievementLink>
                        ))}
                    {updatedSkills.length >= 0 && (
                        <AddButtonSection onClick={handleAddTitle}>
                            <IconAdd />
                        </AddButtonSection>
                    )}
                </SkillSetListItem>
            </AchievementList>
        </SkillSetContainer>
    );
};

export default SkillSet;
