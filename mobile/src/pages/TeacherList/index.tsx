import React, { useState } from 'react';
import { View, ScrollView, Text, AsyncStorage } from 'react-native';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

function TeacherList() {

    const [isFiltersVisible, setisFiltersVisible] = useState(false);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState([]);

    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => {
            if (res) {
                const favoritedTeachers = JSON.parse(res);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })

                setFavorites(favoritedTeachersIds);
            }
        })
    }

    function handleToggleFiltersVisible() {
        setisFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {

        loadFavorites();

        const res = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setisFiltersVisible(false);
        setTeachers(res.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title='Proffys disponíveis'
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >

                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Selecione ..."
                            placeholderTextColor="#c1bccc"
                            value={subject}
                            onChangeText={text => setSubject(text)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Selecione ..."
                                    placeholderTextColor="#c1bccc"
                                    value={week_day}
                                    onChangeText={text => setWeek_day(text)}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Selecione ..."
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                />
                            </View>
                        </View>

                        <RectButton
                            onPress={handleFiltersSubmit}
                            style={styles.submitButton}>
                            <Text style={styles.submitButttonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.techerList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />)
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;